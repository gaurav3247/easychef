// ** React Imports
import {forwardRef} from "react";

const BreadCrumbs = forwardRef((props, refs) => {
    // ** Props
    const {
        basePage,
        currentPage
    } = props;
    return (
        <h4 className="fw-bold pt-3 mb-4 mt-n3">
            <span className="text-muted fw-light">{basePage} /</span>{currentPage}
        </h4>
    );
});

export default BreadCrumbs;

