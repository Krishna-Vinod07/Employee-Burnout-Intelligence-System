
from flask import Blueprint, request, jsonify
from config.db import db
from datetime import datetime

import joblib
import os

mood_bp = Blueprint(
    'mood',
    __name__
)

moods_collection = db['moods']
activities_collection = db['activities']

# ==========================================
# LOAD ML MODEL
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
# ADD MOOD ENTRY
# ==========================================

@mood_bp.route(
    '/add',
    methods=['POST']
)
def add_mood():

    try:

        data = request.json

        stress = int(
            data.get("stress", 0)
        )

        energy = int(
            data.get("energy", 0)
        )

        sleep = int(
            data.get("sleep", 0)
        )

        workload = int(
            data.get("workload", 0)
        )

        latest_activity = activities_collection.find_one(

            {
                "userId":
                data.get("userId")
            },

            sort=[
                ("createdAt", -1)
            ]

        )

        idle_minutes = 0
        active_minutes = 0
        session_duration = 0
        activity_count = 0

        if latest_activity:

            idle_minutes = latest_activity.get(
                "idleMinutes",
                0
            )

            active_minutes = latest_activity.get(
                "activeMinutes",
                0
            )

            session_duration = latest_activity.get(
                "sessionDuration",
                0
            )

            activity_count = latest_activity.get(
                "activityCount",
                0
            )

        # ==========================================
        # ML PREDICTION
        # ==========================================

        features = [[

            stress,

            energy,

            sleep,

            workload,

            active_minutes,

            idle_minutes,

            session_duration,

            activity_count

        ]]

        print("\nINPUT FEATURES")
        print(features)

        print("\nPREDICT PROBABILITY")

        try:

            probs = classification_model.predict_proba(
                features
            )[0]

            for label, prob in zip(

                label_encoder.classes_,

                probs

            ):

                print(
                    f"{label}: {prob:.3f}"
                )

        except Exception as prob_error:

            print(prob_error)

        prediction = classification_model.predict(
            features
        )[0]

        burnout_risk = label_encoder.inverse_transform(

            [int(prediction)]

        )[0]

        print(
            f"\nFINAL PREDICTION: {burnout_risk}\n"
        )

        risk_map = {

            "Low": 25,

            "Moderate": 50,

            "High": 75,

            "Critical": 95

        }

        risk_score = risk_map.get(

            burnout_risk,

            0

        )

        new_mood = {

            "userId":
                data.get("userId"),

            "mood":
                data.get("mood"),

            "stress":
                stress,

            "energy":
                energy,

            "sleep":
                sleep,

            "workload":
                workload,

            "idleMinutes":
                idle_minutes,

            "activeMinutes":
                active_minutes,

            "sessionDuration":
                session_duration,

            "activityCount":
                activity_count,

            "riskScore":
                risk_score,

            "burnoutRisk":
                burnout_risk,

            "createdAt":
                datetime.utcnow()

        }

        result = moods_collection.insert_one(
            new_mood
        )

        return jsonify({

            "status":
                "success",

            "message":
                "Mood entry added",

            "riskScore":
                risk_score,

            "burnoutRisk":
                burnout_risk,

            "id":
                str(
                    result.inserted_id
                )

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
# GET USER MOODS
# ==========================================

@mood_bp.route(
    '/<user_id>',
    methods=['GET']
)
def get_user_moods(user_id):

    try:

        moods = list(

            moods_collection.find({

                "userId": user_id

            }).sort(

                "createdAt",

                -1

            )

        )

        for mood in moods:

            mood['_id'] = str(
                mood['_id']
            )

            mood['createdAt'] = str(
                mood['createdAt']
            )

        return jsonify({

            "status":
                "success",

            "data":
                moods

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
# GET LATEST MOOD
# ==========================================

@mood_bp.route(
    '/latest/<user_id>',
    methods=['GET']
)
def get_latest_mood(user_id):

    try:

        latest_mood = moods_collection.find_one(

            {
                "userId": user_id
            },

            sort=[
                ("createdAt", -1)
            ]

        )

        if not latest_mood:

            return jsonify({

                "status":
                    "error",

                "message":
                    "No mood data found"

            }), 404

        latest_mood['_id'] = str(
            latest_mood['_id']
        )

        latest_mood['createdAt'] = str(
            latest_mood['createdAt']
        )

        return jsonify({

            "status":
                "success",

            "data":
                latest_mood

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status":
                "error",

            "message":
                "Server error"

        }), 500

