import LatLngBoundsLiteral = google.maps.LatLngBoundsLiteral

export interface ParkingSpotFilters {
    priceRange?: string
    userId?: string
    bounds: LatLngBoundsLiteral
    maxDistance?: number
}

export interface Location {
    latitude?: number
    longitude?: number
}
