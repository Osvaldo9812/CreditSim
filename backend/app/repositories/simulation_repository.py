from sqlalchemy.orm import Session

from app.models import Simulation

def save_simulation(
    db: Session,
    amount: float,
    annual_rate: float,
    months: int
):

    simulation = Simulation(
        amount=amount,
        annual_rate=annual_rate,
        months=months
    )

    db.add(simulation)
    db.commit()
    db.refresh(simulation)

    return simulation
