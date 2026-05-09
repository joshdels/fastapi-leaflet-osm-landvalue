from pydantic import BaseModel, Field


class BuildingQuery(BaseModel):
    """This is optional ganna figure this out how to use this"""

    lat: float = Field(..., ge=-90, le=90)
    lon: float = Field(..., ge=-180, le=180)
    radius: int = Field(1000, ge=1, le=50000)
