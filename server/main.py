from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from time import sleep
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
docs = [
    {
        "id": 1,
        "title": "Property Rights Act 2020",
        "content": "This act defines ownership, transfer, and protection of property in both urban and rural areas."
    },
    {
        "id": 2,
        "title": "Employment Law 2021",
        "content": "Covers employer-employee relationships, minimum wage policies, and worker protection laws."
    },
    {
        "id": 3,
        "title": "Contract Enforcement Regulation",
        "content": "Provides guidelines for contract validation, breach of contract, and legal remedies available."
    },
]

@app.get('/generate')
def generate(query:str):
    sleep(3)
    related_docs=[doc for doc in docs if query.lower() in doc['title'].lower() or query.lower() in doc['content'].lower()]
    return {"related_documents": related_docs}