'use client'

import React, {useState} from "react";
import {ParkingList} from "@/components/parking-list";
import {Parking, useParkingSpots} from "@/hooks/useParkingSpots";
import {useFooterState} from "@/hooks/useFooterState";
import FilterSelection, {FilterOption} from "@/components/filter-selection";

export function SearchFooter() {
    const parkingSpots = useParkingSpots(); // Get parking spots from the hook
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
    const [, setFooterState] = useFooterState(); // Zustand state setter
    const [selectedParking, setSelectedParking] = useState<Parking | null>(null);

    // Handle sorting option selection
    const handleSortingOptionChange = (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortingOption((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
    };

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            {/* Filter Selection fixed at the top */}
            <div>
                <FilterSelection
                    selectedSortingOption={selectedSortingOption}
                    handleSortingOptionChange={handleSortingOptionChange}
                />
            </div>

            {/* TODO: there is a problem when im in "Search" mode and i drag the footer up to "open" size. */}
            <div className="flex-grow overflow-y-auto bg-gray-100">
                <ParkingList
                    parkingSpots={parkingSpots}  // Updated prop name
                />
            </div>

            {/* Copyright text fixed at the bottom */}
            <div>
                <p className="text-center m-3 text-xs">
                    &copy; 2024 Space-Ease. All rights reserved.
                </p>
            </div>
        </div>
    );
}


// import {Footer, FooterState} from "@/components/footer";
// import FilterSelection, {FilterOption} from "@/components/filter-selection";
// import ParkingDetails from "@/components/parking-details";
//
// export function SearchFooter() {
//     const [footerState, setFooterState] = useState<FooterState>("collapsed")
//     const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
//

//
//     const handleCloseParkingDetails = () => {
//         setSelectedParking(null); // Reset selected parking
//         setFooterState("open"); // Open the footer
//     };
//
//     // Handle footer state change and update selected filter if necessary.
//     const handleFooterStateChange = (newState: FooterState) => {
//         setFooterState(newState);
//     };
//
//     const handleSubmit = () => {
//         console.log('Form submitted')
//         // Here you would typically send the data to your server
//     }
//
//     // Render the search footer component with select boxes for filter options and footer state.
//     return (
//         <Footer
//             header={
//                 selectedParking ? null : (
//                     <FilterSelection
//                         selectedSortingOption={selectedSortingOption}
//                         handleSortingOptionChange={handleSortingOptionChange}
//                     />
//                 )
//             }
//             state={footerState}
//             onStateChange={handleFooterStateChange}
//         >
//             {selectedParking ? ( // Display the selected parking details if available
//                 <ParkingDetails
//                     parking={selectedParking}
//                     onClose={handleCloseParkingDetails}
//                     onSubmit={handleSubmit}
//                 />
//             ) : (
//                 <ParkingList
//                     addresses={parkingSpots}
//                     setSelectedParking={setSelectedParking}/>
//             )}
//             {/* Conditionally render the copyright text based on selectedParking state */}
//             {!selectedParking && (
//                 <p className="text-center text-sm m-3" onClick={() => setFooterState("collapsed")}>
//                     &copy; 2024 Space-Ease. All rights reserved.
//                 </p>
//             )}
//         </Footer>
//     );
// }


