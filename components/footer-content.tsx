import React from "react";
import {useFooterState} from "@/hooks/useFooterState";
import {CreateFooter} from "@/components/create-footer";
import {DetailFooter} from "@/components/detail-footer";
import {SearchFooter} from "@/components/search-footer";
import {RentalFooter} from "@/components/rental-footer";

export const FooterContent: React.FC = () => {
    const [footerMode,] = useFooterState(state => state.mode.mode)

    switch (footerMode) {
        case "create":
            return <CreateFooter />;
        case "detail":
            return <DetailFooter />;
        case "search":
            return <SearchFooter />;
        case "rent":
            return <RentalFooter />;
    }
}