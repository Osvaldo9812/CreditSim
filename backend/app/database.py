from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
from pathlib import Path
import os

# DATABASE_PATH = Path(__file__).resolve().parent.parent / "creditsim.db"
# DATABASE_URL = f"sqlite:///{DATABASE_PATH}"
DATABASE_PATH = Path(__file__).resolve().parent.parent / "creditsim.db"
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"sqlite:///{DATABASE_PATH}"
)
connect_args = {}
if DATABASE_URL.startswith("sqlite"):

    connect_args = {
        "check_same_thread": False
    }

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()
