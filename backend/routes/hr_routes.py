
from flask import Blueprint, jsonify

from config.db import db
from utils.groq_helper import (
    generate_employee_recommendation
)
from bson import ObjectId

import joblib
import os
from routes.ml_routes import forecast_model
hr_bp = Blueprint(
    'hr',
    __name__
)

moods_collection = db['moods']

users_collection = db['users']

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

# ==========================================
# HR OVERVIEW
# ==========================================

@hr_bp.route(
    '/overview',
    methods=['GET']
)
def hr_overview():

    try:

        moods = list(
            moods_collection.find()
        )

        employees = list(

            users_collection.find({

                "role": "employee"

            })

        )

        activities = list(
            activities_collection.find()
        )

        total_employees = len(employees)

        if len(moods) == 0:

            return jsonify({

                "status": "error",

                "message":
                    "No workforce data found"

            }), 404

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
        # PRODUCTIVITY
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
        # ML CLASSIFICATION COUNTS
        # ==========================================

        low_risk = 0
        moderate_risk = 0
        high_risk = 0
        critical_risk = 0

        for employee in employees:

            latest_mood = moods_collection.find_one(

                {
                    "userId":
                        str(employee["_id"])
                },

                sort=[
                    ("createdAt", -1)
                ]

            )

            if not latest_mood:

                continue

            prediction_label = latest_mood.get(

                "burnoutRisk",

                "Low"

            )

            if prediction_label == "Low":

                low_risk += 1

            elif prediction_label == "Moderate":

                moderate_risk += 1

            elif prediction_label == "High":

                high_risk += 1

            elif prediction_label == "Critical":

                critical_risk += 1

        # ==========================================
        # OVERALL RISK
        # ==========================================

        predictions = [

            "Low" for _ in range(low_risk)

        ] + [

            "Moderate" for _ in range(moderate_risk)

        ] + [

            "High" for _ in range(high_risk)

        ] + [

            "Critical" for _ in range(critical_risk)

        ]

        overall_risk = max(

            set(predictions),

            key=predictions.count

        )

        # ==========================================
        # AI ALERT
        # ==========================================

        workforce_alert = (

            f"{high_risk + critical_risk} employees "

            f"require burnout intervention"

        )

        # ==========================================
        # TREND
        # ==========================================

        burnout_trend = "Stable"

        if average_risk_score >= 70:

            burnout_trend = "Rapid Increase"

        elif average_risk_score >= 55:

            burnout_trend = "Increasing"

        elif average_risk_score <= 30:

            burnout_trend = "Improving"

        # ==========================================
        # PRODUCTIVITY STATUS
        # ==========================================

        productivity_status = "Stable"

        if average_active_minutes >= 300:

            productivity_status = "High Performance"

        elif average_idle_minutes >= 180:

            productivity_status = "Declining"

 
    except Exception as e:

        print("EMPLOYEE DETAILS ERROR:", e)

        return jsonify({

            "status": "error",

            "message":
                str(e)

        }), 500
    return jsonify({

    "status": "success",

    "data": {

        "totalEmployees": total_employees,

        "averageStress": average_stress,

        "averageEnergy": average_energy,

        "averageWorkload": average_workload,

        "averageRiskScore": average_risk_score,

        "averageActiveMinutes": average_active_minutes,

        "averageIdleMinutes": average_idle_minutes,

        "lowRisk": low_risk,

        "moderateRisk": moderate_risk,

        "highRisk": high_risk,

        "criticalRisk": critical_risk,

        "overallRisk": overall_risk,

        "burnoutTrend": burnout_trend,

        "productivityStatus": productivity_status,

        "workforceAlert": workforce_alert

    }

})


# ==========================================
# HIGH RISK EMPLOYEES
# ==========================================

@hr_bp.route(
    '/high-risk',
    methods=['GET']
)
def high_risk_employees():

    try:

        employees = list(

            users_collection.find({

                "role": "employee"

            })

        )

        high_risk_data = []

        for employee in employees:

            user_id = str(
                employee["_id"]
            )

            latest_mood = moods_collection.find_one(

                {
                    "userId": user_id
                },

                sort=[
                    ("createdAt", -1)
                ]

            )

            if not latest_mood:

                continue

            # ==========================================
            # LIVE ML PREDICTION
            # ==========================================

            features = [[

                float(
                    latest_mood.get(
                        "stress",
                        0
                    )
                ),

                float(
                    latest_mood.get(
                        "energy",
                        0
                    )
                ),

                float(
                    latest_mood.get(
                        "sleep",
                        0
                    )
                ),

                float(
                    latest_mood.get(
                        "workload",
                        0
                    )
                ),

                float(
                    latest_mood.get(
                        "activeMinutes",
                        0
                    )
                ),

                float(
                    latest_mood.get(
                        "idleMinutes",
                        0
                    )
                ),

                float(
                    latest_mood.get(
                        "sessionDuration",
                        0
                    )
                ),

                float(
                    latest_mood.get(
                        "activityCount",
                        0
                    )
                )

            ]]

            prediction = classification_model.predict(

                features

            )[0]

            prediction_label = label_encoder.inverse_transform(

                [int(prediction)]

            )[0]

            # ONLY SHOW HIGH / CRITICAL

            if prediction_label not in [

                "High",

                "Critical"

            ]:

                continue

            high_risk_data.append({

                "employeeId":
                    user_id,

                "employeeName":
                    employee.get(
                        "name",
                        "Unknown"
                    ),

                "email":
                    employee.get(
                        "email",
                        ""
                    ),

                "department":
                    employee.get(
                        "department",
                        "Unknown"
                    ),

                "stress":
                    latest_mood.get(
                        "stress",
                        0
                    ),

                "energy":
                    latest_mood.get(
                        "energy",
                        0
                    ),

                "sleep":
                    latest_mood.get(
                        "sleep",
                        0
                    ),

                "workload":
                    latest_mood.get(
                        "workload",
                        0
                    ),

                "riskScore":
                    latest_mood.get(
                        "riskScore",
                        0
                    ),

                "burnoutRisk":
                    prediction_label

            })

        high_risk_data = sorted(

            high_risk_data,

            key=lambda x:
                x["riskScore"],

            reverse=True

        )

        return jsonify({

            "status":
                "success",

            "count":
                len(high_risk_data),

            "employees":
                high_risk_data

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status":
                "error",

            "message":
                "Server error"

        }), 500

# ==========================================
# DEPARTMENT ANALYTICS
# ==========================================

@hr_bp.route(
    '/departments',
    methods=['GET']
)
def department_analytics():

    try:

        employees = list(

            users_collection.find({

                "role": "employee"

            })

        )

        department_data = {}

        for employee in employees:

            department = employee.get(

                "department",

                "Unknown"

            )

            user_id = str(
                employee["_id"]
            )

            latest_mood = moods_collection.find_one(

                {
                    "userId": user_id
                },

                sort=[
                    ("createdAt", -1)
                ]

            )

            if not latest_mood:

                continue

            if department not in department_data:

                department_data[department] = {

                    "employees": 0,

                    "risk_scores": []

                }

            department_data[department][
                "employees"
            ] += 1

            department_data[department][
                "risk_scores"
            ].append(

                float(
                    latest_mood.get(
                        "riskScore",
                        0
                    )
                )

            )

        final_departments = []

        for name, data in department_data.items():

            avg_risk = round(

                sum(
                    data["risk_scores"]
                ) /

                max(
                    len(data["risk_scores"]),
                    1
                )

            )

            # ==========================================
            # DEPARTMENT STATUS
            # ==========================================

            if avg_risk >= 90:

                status = "Critical"

            elif avg_risk >= 70:

                status = "High"

            elif avg_risk >= 40:

                status = "Moderate"

            else:

                status = "Low"

            color_map = {

                "Low":
                    "from-green-500 to-emerald-500",

                "Moderate":
                    "from-yellow-500 to-amber-400",

                "High":
                    "from-orange-500 to-red-500",

                "Critical":
                    "from-red-600 to-red-400"

            }

            final_departments.append({

                "name":
                    name,

                "burnout":
                    avg_risk,

                "employees":
                    data["employees"],

                "status":
                    status,

                "color":
                    color_map.get(
                        status,
                        "from-gray-500 to-gray-700"
                    )

            })

        final_departments = sorted(

            final_departments,

            key=lambda x:
                x["burnout"],

            reverse=True

        )

        return jsonify({

            "status":
                "success",

            "departments":
                final_departments,

            "highestRisk":

                final_departments[0]

                if len(final_departments) > 0

                else None

        })

    except Exception as e:

        print(
            "DEPARTMENT ERROR:",
            e
        )

        return jsonify({

            "status":
                "error",

            "message":
                "Department analytics failed"

        }), 500
# ==========================================
# EMPLOYEE DETAILS
# ==========================================


@hr_bp.route(
    '/employee/<employee_id>',
    methods=['GET']
)
def employee_details(employee_id):

    try:

        user = users_collection.find_one({

            "_id": ObjectId(employee_id)

        })

        if not user:

            return jsonify({

                "status": "error",

                "message":
                    "Employee not found"

            }), 404

        latest_mood = moods_collection.find_one(

            {
                "userId": employee_id
            },

            sort=[
                ("createdAt", -1)
            ]

        )

        latest_activity = activities_collection.find_one(

            {
                "userId": employee_id
            },

            sort=[
                ("createdAt", -1)
            ]

        )

        # ==========================================
        # AI INSIGHT + RECOMMENDATIONS
        # ==========================================

        groq_result = {

            "insight": "",

            "recommendations": []

        }

        if latest_mood:

            groq_result = generate_employee_recommendation({

                "stress":
                    latest_mood.get(
                        "stress",
                        0
                    ),

                "energy":
                    latest_mood.get(
                        "energy",
                        0
                    ),

                "sleep":
                    latest_mood.get(
                        "sleep",
                        0
                    ),

                "workload":
                    latest_mood.get(
                        "workload",
                        0
                    ),

                "burnoutRisk":
                    latest_mood.get(
                        "burnoutRisk",
                        "Low"
                    ),

                "riskScore":
                    latest_mood.get(
                        "riskScore",
                        0
                    )

            })

        # FIX MONGO OBJECTS

        if latest_mood:

            latest_mood["_id"] = str(
                latest_mood["_id"]
            )

            if "createdAt" in latest_mood:

                latest_mood["createdAt"] = str(
                    latest_mood["createdAt"]
                )

        if latest_activity:

            latest_activity["_id"] = str(
                latest_activity["_id"]
            )

            if "createdAt" in latest_activity:

                latest_activity["createdAt"] = str(
                    latest_activity["createdAt"]
                )

        return jsonify({

            "status": "success",

            "employee": {

                "id":
                    str(user["_id"]),

                "name":
                    user.get(
                        "name",
                        "Unknown"
                    ),

                "email":
                    user.get(
                        "email",
                        ""
                    ),

                "department":
                    user.get(
                        "department",
                        "Unknown"
                    ),

                "role":
                    user.get(
                        "role",
                        ""
                    )

            },

            "latestMood":
                latest_mood,

            "latestActivity":
                latest_activity,

            "aiInsight":
                groq_result.get(
                    "insight",
                    ""
                ),

            "recommendations":
                groq_result.get(
                    "recommendations",
                    []
                )

        })

    except Exception as e:

        print("EMPLOYEE DETAILS ERROR:", e)

        return jsonify({

            "status": "error",

            "message":
                str(e)

        }), 500
 
 
# ==========================================
# COMPANY FORECAST
# ==========================================

@hr_bp.route(
    '/forecast',
    methods=['GET']
)
def company_forecast():

    try:

        from utils.groq_helper import (

            generate_hr_recommendation,

            generate_hr_action_plan

        )

        employees = list(

            users_collection.find({

                "role": "employee"

            })

        )

        valid_employees = 0

        avg_stress = 0
        avg_energy = 0
        avg_sleep = 0
        avg_workload = 0

        for employee in employees:

            mood = moods_collection.find_one(

                {
                    "userId":
                        str(employee["_id"])
                },

                sort=[
                    ("createdAt", -1)
                ]

            )

            if not mood:

                continue

            valid_employees += 1

            avg_stress += mood.get(
                "stress",
                0
            )

            avg_energy += mood.get(
                "energy",
                0
            )

            avg_sleep += mood.get(
                "sleep",
                0
            )

            avg_workload += mood.get(
                "workload",
                0
            )

        if valid_employees == 0:

            return jsonify({

                "status": "error",

                "message":
                    "No employee data"

            })

        avg_stress /= valid_employees
        avg_energy /= valid_employees
        avg_sleep /= valid_employees
        avg_workload /= valid_employees

        forecast_data = []

        features = [

            avg_stress,
            avg_energy,
            avg_sleep,
            avg_workload,
            60,
            20,
            60,
            100

        ]

        for week in range(1, 7):

            burnout = forecast_model.predict(

                [features]

            )[0]

            retention = max(

                100 - burnout,

                0

            )

            forecast_data.append({

                "week":
                    f"W{week}",

                "burnout":
                    round(
                        float(burnout),
                        2
                    ),

                "retention":
                    round(
                        float(retention),
                        2
                    )

            })

            features[0] = min(
                features[0] + 1,
                100
            )

            features[1] = max(
                features[1] - 1,
                0
            )

            features[3] = min(
                features[3] + 1,
                100
            )

        latest_prediction = forecast_data[-1]

        escalation = round(

            latest_prediction["burnout"]

            -

            forecast_data[0]["burnout"],

            2

        )

        recommendation = generate_hr_recommendation(

            forecast_data,

            escalation

        )

        action_plan = generate_hr_action_plan(

            forecast_data,

            escalation

        )

        return jsonify({

            "status":
                "success",

            "forecastData":
                forecast_data,

            "escalation":
                escalation,

            "recommendation":
                recommendation,

            "actionPlan":
                action_plan

        })

    except Exception as e:

        print(

            "FORECAST ERROR:",

            e

        )

        return jsonify({

            "status":
                "error",

            "message":
                str(e)

        }), 500
    
# ==========================================
# WORKFORCE REPORT
# ==========================================

@hr_bp.route(
    '/workforce-report',
    methods=['GET']
)
def workforce_report():

    try:

        from utils.groq_helper import (
            generate_workforce_report
        )

        overview = hr_overview().get_json()

        report = generate_workforce_report(

            overview["data"]

        )

        return jsonify({

            "status": "success",

            "report": report

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message": "Report generation failed"

        }), 500
    
# ==========================================
# ALL EMPLOYEES
# ==========================================

@hr_bp.route(
    '/employees',
    methods=['GET']
)
def all_employees():

    try:

        employees = list(

            users_collection.find({

                "role": "employee"

            })

        )

        employee_data = []

        for employee in employees:

            user_id = str(
                employee["_id"]
            )

            latest_mood = moods_collection.find_one(

                {
                    "userId": user_id
                },

                sort=[
                    ("createdAt", -1)
                ]

            )

            if not latest_mood:

                continue

            employee_data.append({

                "employeeId":
                    user_id,

                "employeeName":
                    employee.get(
                        "name",
                        "Unknown"
                    ),

                "email":
                    employee.get(
                        "email",
                        ""
                    ),

                "department":
                    employee.get(
                        "department",
                        "Unknown"
                    ),

                "stress":
                    latest_mood.get(
                        "stress",
                        0
                    ),

                "energy":
                    latest_mood.get(
                        "energy",
                        0
                    ),

                "workload":
                    latest_mood.get(
                        "workload",
                        0
                    ),

                "riskScore":
                    latest_mood.get(
                        "riskScore",
                        0
                    ),

                "burnoutRisk":
                    latest_mood.get(
                        "burnoutRisk",
                        "Low"
                    )

            })

        employee_data = sorted(

            employee_data,

            key=lambda x:
                x["riskScore"],

            reverse=True

        )

        return jsonify({

            "status": "success",

            "employees":
                employee_data

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message":
                "Failed to load employees"

        }), 500


