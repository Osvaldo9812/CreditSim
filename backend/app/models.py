from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import DateTime

from datetime import datetime

from .database import Base

class Simulation(Base):

    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True)

    amount = Column(Float, nullable=False)

    annual_rate = Column(Float, nullable=False)

    months = Column(Integer, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
