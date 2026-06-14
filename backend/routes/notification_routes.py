from flask import Blueprint, jsonify
from config.db import db
from bson import ObjectId

notification_bp = Blueprint(
    'notification',
    __name__
)

moods_collection = db['moods']
users_collection = db['users']


# GET NOTIFICATIONS
@notification_bp.route(
    '/',
    methods=['GET']
)
def get_notifications():

    try:

        moods = list(
            moods_collection.find()
        )

        notifications = []

        for mood in moods:

            risk = mood.get(
                'burnoutRisk',
                'Low'
            )

            # ONLY HIGH / CRITICAL
            if risk in ['High', 'Critical']:

                # FIND USER
                user = users_collection.find_one({

                    "_id": ObjectId(
                        mood['userId']
                    )

                })

                if not user:
                    continue

                # PRIORITY
                priority = (
                    "Urgent"
                    if risk == "Critical"
                    else "High"
                )

                # MESSAGE
                message = (

                    f"{user['name']} "

                    f"shows {risk.lower()} "

                    f"burnout risk."

                )

                # TITLE
                title = (

                    "Critical Burnout Alert"

                    if risk == "Critical"

                    else "High Burnout Warning"

                )

                notifications.append({

                    "employeeName": user['name'],

                    "email": user['email'],

                    "title": title,

                    "message": message,

                    "priority": priority,

                    "riskScore": mood.get(
                        'riskScore',
                        0
                    ),

                    "burnoutRisk": risk

                })

        # SORT
        notifications = sorted(

            notifications,

            key=lambda x: x['riskScore'],

            reverse=True

        )

        return jsonify({

            "status": "success",

            "count": len(notifications),

            "notifications": notifications

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message": "Server error"

        }), 500