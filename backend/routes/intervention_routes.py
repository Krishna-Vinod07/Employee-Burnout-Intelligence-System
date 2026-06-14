from flask import Blueprint, request, jsonify
from config.db import db
from datetime import datetime

intervention_bp = Blueprint(
    'intervention',
    __name__
)

interventions_collection = db['interventions']


# CREATE INTERVENTION
@intervention_bp.route(
    '/create',
    methods=['POST']
)
def create_intervention():

    try:

        data = request.json

        new_intervention = {

            "employeeName": data.get(
                'employeeName'
            ),

            "email": data.get(
                'email'
            ),

            "intervention": data.get(
                'intervention'
            ),

            "priority": data.get(
                'priority',
                'Medium'
            ),

            "status": "Pending",

            "createdAt": datetime.utcnow()

        }

        result = interventions_collection.insert_one(
            new_intervention
        )

        return jsonify({

            "status": "success",

            "message": "Intervention created",

            "id": str(result.inserted_id)

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message": "Server error"

        }), 500


# GET ALL INTERVENTIONS
@intervention_bp.route(
    '/',
    methods=['GET']
)
def get_interventions():

    try:

        interventions = list(

            interventions_collection.find()

        )

        for intervention in interventions:

            intervention['_id'] = str(
                intervention['_id']
            )

            intervention['createdAt'] = str(
                intervention['createdAt']
            )

        return jsonify({

            "status": "success",

            "count": len(interventions),

            "interventions": interventions

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message": "Server error"

        }), 500


# TEMP TEST INTERVENTION
@intervention_bp.route(
    '/test',
    methods=['GET']
)
def test_intervention():

    try:

        new_intervention = {

            "employeeName": "Anna",

            "email": "anna@company.com",

            "intervention": "Reduce workload by 20%",

            "priority": "Urgent",

            "status": "Pending",

            "createdAt": datetime.utcnow()

        }

        interventions_collection.insert_one(
            new_intervention
        )

        return jsonify({

            "status": "success",

            "message": "Test intervention created"

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message": "Server error"

        }), 500