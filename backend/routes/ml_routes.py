
from flask import Blueprint, request, jsonify

import joblib

import os

ml_bp = Blueprint(
    "ml",
    __name__
)

# ==========================================
# LOAD MODELS
# ==========================================

classification_model = joblib.load(

    os.path.join(
        "ml",
        "burnout_model.pkl"
    )

)

forecast_model = joblib.load(

    os.path.join(
        "ml",
        "forecast_model.pkl"
    )

)

# LOAD LABEL ENCODER
label_encoder = joblib.load(

    os.path.join(
        "ml",
        "label_encoder.pkl"
    )

)

# ==========================================
# CURRENT BURNOUT PREDICTION
# ==========================================

@ml_bp.route(
    "/predict",
    methods=["POST"]
)
def predict():

    try:

        data = request.json

        features = [[

            float(data.get("stress", 0)),

            float(data.get("energy", 0)),

            float(data.get("sleep", 0)),

            float(data.get("workload", 0)),

            float(data.get("activeMinutes", 0)),

            float(data.get("idleMinutes", 0)),

            float(data.get("sessionDuration", 0)),

            float(data.get("activityCount", 0))

        ]]
        

        # ==========================================
        # ML PREDICTION
        # ==========================================

        prediction = classification_model.predict(
            features
        )[0]

        # ==========================================
        # DECODE LABEL
        # ==========================================

        prediction_label = label_encoder.inverse_transform(

            [int(prediction)]

        )[0]

        return jsonify({

            "status": "success",

            "prediction":
                prediction_label

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message":
                "Prediction failed"

        }), 500

# ==========================================
# FUTURE FORECASTING
# ==========================================

@ml_bp.route(
    "/forecast",
    methods=["POST"]
)
def forecast():

    try:

        data = request.json

        current_features = [

            float(data.get("stress", 0)),

            float(data.get("energy", 0)),

            float(data.get("sleep", 0)),

            float(data.get("workload", 0)),

            float(data.get("activeMinutes", 0)),

            float(data.get("idleMinutes", 0)),

            float(data.get("sessionDuration", 0)),

            float(data.get("activityCount", 0))

        ]

        forecast_data = []

        simulated_features = current_features.copy()

        # ==========================================
        # ML FORECAST
        # ==========================================

        for week in range(1, 7):

            future_risk = forecast_model.predict(

                [simulated_features]

            )[0]

            productivity = max(

                100 - future_risk,

                0

            )

            forecast_data.append({

                "week": f"W{week}",

                "burnout":
                    round(float(future_risk), 2),

                "productivity":
                    round(float(productivity), 2)

            })

            # ==========================================
            # FUTURE FEATURE EVOLUTION
            # ==========================================

            simulated_features = [

                min(
                    simulated_features[0] + 1.5,
                    100
                ),

                max(
                    simulated_features[1] - 1,
                    0
                ),

                max(
                    simulated_features[2] - 0.1,
                    0
                ),

                min(
                    simulated_features[3] + 1,
                    100
                ),

                max(
                    simulated_features[4] - 5,
                    0
                ),

                min(
                    simulated_features[5] + 3,
                    500
                ),

                min(
                    simulated_features[6] + 0.2,
                    16
                ),

                max(
                    simulated_features[7] - 2,
                    0
                )

            ]

        return jsonify({

            "status": "success",

            "forecast":
                forecast_data

        })

    except Exception as e:

        print(e)

        return jsonify({

            "status": "error",

            "message":
                "Forecast failed"

        }), 500

