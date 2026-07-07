from fastapi import APIRouter
from fastapi import BackgroundTasks
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.repositories.simulation_repository import save_simulation
from app.schemas import SimulationRequest
from app.services.audit_service import notify_scoring_safely
from app.services.amortizacion_service import calculate_schedule

router = APIRouter()

@router.post("/simulate")
def simulate(
    request: SimulationRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):

    simulation = save_simulation(
        db,
        request.amount,
        request.annual_rate,
        request.months
    )

    schedule = calculate_schedule(
        request.amount,
        request.annual_rate,
        request.months
    )

    background_tasks.add_task(
        notify_scoring_safely
    )

    return {
        "simulation_id": simulation.id,
        "schedule": schedule
    }
