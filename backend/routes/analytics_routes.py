from flask import Blueprint, jsonify
from config.db import db
import joblib
import os

from utils.groq_helper import (
    generate_employee_recommendation
)
analytics_bp = Blueprint(
    'analytics',
    __name__
)

moods_collection = db['moods']
activities_collection = db['activities']

# ==========================================
# LOAD ML MODELS
# ==========================================

classification_model = joblib.load(

    os.path.join(
        "ml",
        "burnout_model.pkl"
    )

)

label_encoder = joblib.load(

    os.path.join(
        "ml",
        "label_encoder.pkl"
    )

)
forecast_model = joblib.load(

    os.path.join(
        "ml",
        "forecast_model.pkl"
    )

)

# ==========================================
# EMPLOYEE ANALYTICS
# ==========================================

@analytics_bp.route(
    '/employee/<user_id>',
    methods=['GET']
)
def employee_analytics(user_id):

    try:

        # GET MOODS
        moods = list(

            moods_collection.find({

                "userId": user_id

            }).sort("createdAt", 1)

        )

        # GET ACTIVITIES
        activities = list(

            activities_collection.find({

                "userId": user_id

            }).sort("createdAt", 1)

        )

        # ==========================================
        # EMPTY STATE
        # ==========================================

        if len(moods) == 0:

            return jsonify({

                "status": "success",

                "data": {

                    "averageStress": 0,

                    "averageEnergy": 0,

                    "averageSleep": 0,

                    "averageWorkload": 0,

                    "riskScore": 0,

                    "burnoutRisk": "Low",

                    "focusScore": 0,

                    "totalEntries": 0,

                    "forecastData": [],

                    "riskFactors": [],

                    "recommendations": []

                }

            })

        # ==========================================
        # TOTAL ENTRIES
        # ==========================================

        total_entries = len(moods)

        # ==========================================
        # AVERAGES
        # ==========================================

        average_stress = round(

            sum(

                mood.get('stress', 0)

                for mood in moods

            ) / total_entries

        )

        average_energy = round(

            sum(

                mood.get('energy', 0)

                for mood in moods

            ) / total_entries

        )

        average_sleep = round(

            sum(

                mood.get('sleep', 0)

                for mood in moods

            ) / total_entries

        )

        average_workload = round(

            sum(

                mood.get('workload', 0)

                for mood in moods

            ) / total_entries

        )

        average_risk_score = round(

            sum(

                mood.get('riskScore', 0)

                for mood in moods

            ) / total_entries

        )

        # ==========================================
        # ACTIVITY ANALYTICS
        # ==========================================

        total_activity_entries = max(

            len(activities),

            1

        )

        average_active_minutes = round(

            sum(

                activity.get(
                    'activeMinutes',
                    0
                )

                for activity in activities

            ) / total_activity_entries

        )

        average_idle_minutes = round(

            sum(

                activity.get(
                    'idleMinutes',
                    0
                )

                for activity in activities

            ) / total_activity_entries

        )

        # ==========================================
        # FOCUS SCORE
        # ==========================================

        focus_score = round(

            (
                average_energy * 0.4
            ) +

            (
                (100 - average_stress) * 0.4
            ) +

            (
                (100 - average_idle_minutes) * 0.2
            )

        )

        # ==========================================
        # USE LATEST STORED RANDOM FOREST RESULT
        # ==========================================

        latest_mood = moods[-1]

        burnout_risk = latest_mood.get(
            "burnoutRisk",
            "Low"
        )

        risk_score = latest_mood.get(
            "riskScore",
            0
        )
    

        # ==========================================
        # ML FORECAST DATA
        # ==========================================

        forecast_data = []

        average_session_duration = round(

            sum(

                activity.get(
                    "sessionDuration",
                    0
                )

                for activity in activities

            ) / total_activity_entries

        )

        average_activity_count = round(

            sum(

                activity.get(
                    "activityCount",
                    0
                )

                for activity in activities

            ) / total_activity_entries

        )
                # ==========================================
        # FORECAST GENERATION
        # ==========================================

        forecast_features = [

            average_stress,

            average_energy,

            average_sleep,

            average_workload,

            average_active_minutes,

            average_idle_minutes,

            average_session_duration,

            average_activity_count

        ]

        for i in range(1, 7):

            future_risk = forecast_model.predict(

                [forecast_features]

            )[0]

            productivity = max(

                100 - future_risk,

                0

            )

            forecast_data.append({

                "week": f"W{i}",

                "burnout":
                    round(float(future_risk), 2),

                "productivity":
                    round(float(productivity), 2)

            })

            forecast_features = [

                min(
                    forecast_features[0] + 1,
                    100
                ),

                max(
                    forecast_features[1] - 1,
                    0
                ),

                max(
                    forecast_features[2] - 0.1,
                    0
                ),

                min(
                    forecast_features[3] + 1,
                    100
                ),

                max(
                    forecast_features[4] - 5,
                    0
                ),

                min(
                    forecast_features[5] + 2,
                    500
                ),

                average_session_duration,

                average_activity_count

            ]
        # ==========================================
        # RISK FACTORS
        # ==========================================

        risk_factors = []

        if average_stress >= 70:

            risk_factors.append({

                "title":
                    "High stress accumulation",

                "value":
                    "+7.2",

                "width":
                    "90%"

            })

        if average_workload >= 70:

            risk_factors.append({

                "title":
                    "Workload overload",

                "value":
                    "+6.1",

                "width":
                    "82%"

            })

        if average_sleep <= 5:

            risk_factors.append({

                "title":
                    "Sleep deficit",

                "value":
                    "+4.8",

                "width":
                    "70%"

            })

        if average_idle_minutes >= 120:

            risk_factors.append({

                "title":
                    "Low engagement",

                "value":
                    "+3.9",

                "width":
                    "60%"

            })
        
                # ==========================================
        # AI RECOMMENDATIONS
        # ==========================================

        groq_result = generate_employee_recommendation({

            "stress": average_stress,

            "energy": average_energy,

            "sleep": average_sleep,

            "workload": average_workload,

            "burnoutRisk": burnout_risk,

            "riskScore": risk_score,

            "focusScore": focus_score

        })

        recommendations = groq_result.get(

            "recommendations",

            []

        )

        ai_insight = groq_result.get(

            "insight",

            "AI insight unavailable."

        )
        # ==========================================
        # RESPONSE
        # ==========================================

        return jsonify({

            "status": "success",

            "data": {

                # WELLNESS
                "averageStress":
                    average_stress,

                "averageEnergy":
                    average_energy,

                "averageSleep":
                    average_sleep,

                "averageWorkload":
                    average_workload,

                "aiInsight":
                    ai_insight,

                # RISK
                "riskScore":
    risk_score,

                "burnoutRisk":
                    burnout_risk,

                # PRODUCTIVITY
                "focusScore":
                    focus_score,

                "averageActiveMinutes":
                    average_active_minutes,

                "averageIdleMinutes":
                    average_idle_minutes,

                # ENTRIES
                "totalEntries":
                    total_entries,

                # AI
                "forecastData":
                    forecast_data,

                "riskFactors":
                    risk_factors,

                "recommendations":
                    recommendations

            }

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message":
                "Server error"

        }), 500