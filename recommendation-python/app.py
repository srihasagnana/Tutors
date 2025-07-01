from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["tutions"]
tutor_collection = db["tuters"]

# Fetch complete tutor details including subject
def fetch_tutors_db():
    return list(tutor_collection.find({}, {"_id": 0, "tutorname": 1, "academyname": 1, "schedule.subject": 1}))

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        input_subject = data.get("subject", "").lower().strip()

        tutors = list(tutor_collection.find({}, {"_id": 0, "tutorname": 1, "academyname": 1, "schedule.subject": 1}))
        subjects = [t.get("schedule", {}).get("subject", "") for t in tutors]

        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform(subjects)

        # Find the index of the input subject in the matrix
        input_vector = tfidf.transform([input_subject])
        scores = cosine_similarity(input_vector, tfidf_matrix).flatten()

        similar = scores.argsort()[::-1][:3]
        results = [tutors[i] for i in similar]
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000)
