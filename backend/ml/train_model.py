
import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

from sklearn.preprocessing import LabelEncoder

from sklearn.metrics import accuracy_score

import joblib

# ==========================================
# LOAD DATASET
# ==========================================

df = pd.read_csv(

    'employee_burnout_dataset.csv'

)

print(
    "Dataset loaded!"
)

# ==========================================
# FEATURES
# ==========================================

X = df[[

    'stress',

    'energy',

    'sleep',

    'workload',

    'activeMinutes',

    'idleMinutes',

    'sessionDuration',

    'activityCount'

]]

# ==========================================
# TARGET
# ==========================================

y = df['burnoutRisk']

print(df['burnoutRisk'].value_counts())

# ==========================================
# ENCODE LABELS
# ==========================================

encoder = LabelEncoder()

y_encoded = encoder.fit_transform(y)

print(
    "Labels encoded!"
)

# ==========================================
# TRAIN TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(

    X,

    y_encoded,

    test_size=0.2,

    random_state=42

)

# ==========================================
# MODEL
# ==========================================

model = RandomForestClassifier(

    n_estimators=200,

    random_state=42

)

print(
    "Training model..."
)

# ==========================================
# TRAIN
# ==========================================

model.fit(

    X_train,

    y_train

)

print(
    "Model trained!"
)

# ==========================================
# TEST
# ==========================================

predictions = model.predict(
    X_test
)

accuracy = accuracy_score(

    y_test,

    predictions

)

print(
    f"Accuracy: {accuracy * 100:.2f}%"
)

# ==========================================
# CLASSIFICATION REPORT
# ==========================================

from sklearn.metrics import (
    classification_report,
    confusion_matrix
)

print("\nClassification Report:")

print(

    classification_report(

        y_test,

        predictions,

        target_names=encoder.classes_

    )

)

print("\nConfusion Matrix:")

print(

    confusion_matrix(

        y_test,

        predictions

    )

)

# ==========================================
# SAVE MODEL
# ==========================================

joblib.dump(

    model,

    'ml/burnout_model.pkl'

)

# SAVE ENCODER
joblib.dump(

    encoder,

    'ml/label_encoder.pkl'

)

print(
    "Model + encoder saved!"
)

