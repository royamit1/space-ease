import LatLngBoundsLiteral = google.maps.LatLngBoundsLiteral

export interface ParkingSpotFilters {
    priceRange?: string
    userId?: string
    bounds: LatLngBoundsLiteral
}

export interface Location {
    latitude?: number
    longitude?: number
}
