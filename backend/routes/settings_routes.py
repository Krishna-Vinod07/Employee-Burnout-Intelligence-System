from flask import Blueprint, request, jsonify
from config.db import db

settings_bp = Blueprint(
    "settings",
    __name__
)

settings_collection = db["settings"]

# ==============================
# SAVE SETTINGS
# ==============================

@settings_bp.route(
    "/save",
    methods=["POST"]
)
def save_settings():

    try:

        data = request.json

        user_id = data.get("userId")

        settings_collection.update_one(

            {
                "userId": user_id
            },

            {
                "$set": {

                    "darkMode":
                        data.get("darkMode"),

                    "emailAlerts":
                        data.get("emailAlerts"),

                    "criticalOnly":
                        data.get("criticalOnly"),

                    "anonymizeReports":
                        data.get("anonymizeReports"),

                    "threshold":
                        data.get("threshold")

                }

            },

            upsert=True

        )

        return jsonify({

            "status": "success",

            "message":
                "Settings saved successfully"

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message":
                "Server error"

        }), 500


# ==============================
# GET SETTINGS
# ==============================

@settings_bp.route(
    "/<user_id>",
    methods=["GET"]
)
def get_settings(user_id):

    try:

        settings = settings_collection.find_one({

            "userId": user_id

        })

        # DEFAULT SETTINGS
        if not settings:

            return jsonify({

                "status": "success",

                "data": {

                    "darkMode": True,

                    "emailAlerts": True,

                    "criticalOnly": False,

                    "anonymizeReports": True,

                    "threshold": 65

                }

            })

        settings["_id"] = str(
            settings["_id"]
        )

        return jsonify({

            "status": "success",

            "data": settings

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message":
                "Server error"

        }), 500