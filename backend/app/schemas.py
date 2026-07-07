from pydantic import BaseModel
from pydantic import Field

class SimulationRequest(BaseModel):

    amount: float = Field(gt=0)

    annual_rate: float = Field(ge=0)

    months: int = Field(gt=0)
