from flask import Blueprint, request, jsonify
from config.db import db
from datetime import datetime

activity_bp = Blueprint(
    'activity',
    __name__
)

activity_collection = db['activities']


# SAVE ACTIVITY
@activity_bp.route(
    '/track',
    methods=['POST']
)
def track_activity():

    try:

        data = request.json

        new_activity = {

            "userId": data.get(
                'userId'
            ),

            "activeMinutes": data.get(
                'activeMinutes',
                0
            ),

            "idleMinutes": data.get(
                'idleMinutes',
                0
            ),

            "activityCount": data.get(
                'activityCount',
                0
            ),

            "sessionDuration": data.get(
                'sessionDuration',
                0
            ),

            "createdAt": datetime.utcnow()

        }

        result = activity_collection.insert_one(
            new_activity
        )

        return jsonify({

            "status": "success",

            "message": "Activity tracked",

            "id": str(result.inserted_id)

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message": "Server error"

        }), 500


# GET USER ACTIVITY
@activity_bp.route(
    '/<user_id>',
    methods=['GET']
)
def get_activity(user_id):

    try:

        activities = list(

            activity_collection.find({

                "userId": user_id

            })

        )

        for activity in activities:

            activity['_id'] = str(
                activity['_id']
            )

        return jsonify({

            "status": "success",

            "count": len(activities),

            "data": activities

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message": "Server error"

        }), 500