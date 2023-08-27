import Image from "next/image";
import { Fragment } from "react";
import AddAirspace from "./AddAirspace";
import AdditionalAispaceInformation from "./AdditionalAirspaceInformation";

const AddAirspaceModal = (props) => {
    return <Fragment>
            <AddAirspace closeMap={props.closeMap} />
            {/* <AdditionalAispaceInformation /> */}
    </Fragment>
}

export default AddAirspaceModal;