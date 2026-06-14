from flask import Blueprint, jsonify
from config.db import db

recommendation_bp = Blueprint(
    'recommendation',
    __name__
)

moods_collection = db['moods']


# AI RECOMMENDATIONS
@recommendation_bp.route(
    '/<user_id>',
    methods=['GET']
)
def get_recommendations(user_id):

    try:

        # GET LATEST MOOD
        latest_mood = moods_collection.find_one(

            {"userId": user_id},

            sort=[("createdAt", -1)]

        )

        # NO DATA
        if not latest_mood:

            return jsonify({

                "status": "error",

                "message": "No wellness data found"

            }), 404

        # GET VALUES
        stress = latest_mood.get(
            'stress',
            0
        )

        energy = latest_mood.get(
            'energy',
            0
        )

        sleep = latest_mood.get(
            'sleep',
            0
        )

        workload = latest_mood.get(
            'workload',
            0
        )

        risk = latest_mood.get(
            'burnoutRisk',
            'Low'
        )

        # DEFAULT RESPONSE
        recommendation = ""
        action = ""
        priority = ""

        # CRITICAL
        if risk == "Critical":

            recommendation = (
                "Immediate recovery and workload reduction required."
            )

            action = (
                "Schedule urgent HR wellness intervention."
            )

            priority = "Urgent"

        # HIGH
        elif risk == "High":

            recommendation = (
                "Stress levels are significantly elevated."
            )

            action = (
                "Recommend wellness support and meeting reduction."
            )

            priority = "High"

        # MODERATE
        elif risk == "Moderate":

            recommendation = (
                "Monitor stress and recovery patterns closely."
            )

            action = (
                "Encourage work-life balance improvements."
            )

            priority = "Medium"

        # LOW
        else:

            recommendation = (
                "Employee wellness currently stable."
            )

            action = (
                "Maintain healthy productivity habits."
            )

            priority = "Low"

        # EXTRA INSIGHTS
        insights = []

        if sleep <= 4:

            insights.append(
                "Critical sleep deficiency detected."
            )

        if energy <= 30:

            insights.append(
                "Energy levels extremely low."
            )

        if stress >= 80:

            insights.append(
                "Severe stress overload identified."
            )

        if workload >= 80:

            insights.append(
                "Workload pressure critically high."
            )

        return jsonify({

            "status": "success",

            "data": {

                "burnoutRisk": risk,

                "recommendation": recommendation,

                "action": action,

                "priority": priority,

                "insights": insights

            }

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message": "Server error"

        }), 500