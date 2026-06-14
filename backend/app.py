from flask import Flask
from flask_cors import CORS

from config.db import db

# ROUTES
from routes.auth_routes import auth
from routes.mood_routes import mood_bp
from routes.analytics_routes import analytics_bp
from routes.hr_routes import hr_bp
from routes.recommendation_routes import recommendation_bp
from routes.notification_routes import notification_bp
from routes.intervention_routes import intervention_bp
from routes.activity_routes import activity_bp
from routes.ml_routes import ml_bp
from routes.settings_routes import settings_bp

# APP
app = Flask(__name__)

# CORS
CORS(app)

# ==============================
# REGISTER ROUTES
# ==============================

# AUTH
app.register_blueprint(
    auth,
    url_prefix="/api/auth"
)

# MOOD
app.register_blueprint(
    mood_bp,
    url_prefix="/api/mood"
)

# ANALYTICS
app.register_blueprint(
    analytics_bp,
    url_prefix="/api/analytics"
)

# HR
app.register_blueprint(
    hr_bp,
    url_prefix="/api/hr"
)

# RECOMMENDATIONS
app.register_blueprint(
    recommendation_bp,
    url_prefix="/api/recommendations"
)

# NOTIFICATIONS
app.register_blueprint(
    notification_bp,
    url_prefix="/api/notifications"
)

# INTERVENTIONS
app.register_blueprint(
    intervention_bp,
    url_prefix="/api/interventions"
)

# ACTIVITY TRACKING
app.register_blueprint(
    activity_bp,
    url_prefix="/api/activity"
)

# ML ENGINE
app.register_blueprint(
    ml_bp,
    url_prefix="/api/ml"
)

# SETTINGS
app.register_blueprint(
    settings_bp,
    url_prefix="/api/settings"
)

# ==============================
# HOME
# ==============================

@app.route("/")
def home():

    return {

        "message":
            "BurnoutAI Backend Running"

    }

# ==============================
# TEST DATABASE
# ==============================

@app.route("/api/test")
def test():

    collections = db.list_collection_names()

    return {

        "status": "success",

        "message":
            "MongoDB connected successfully",

        "collections":
            collections

    }

# ==============================
# RUN SERVER
# ==============================

if __name__ == "__main__":

    app.run(

        debug=True,

        use_reloader=False

    )