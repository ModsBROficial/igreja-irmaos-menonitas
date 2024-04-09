import { BounceLoader, } from "react-spinners";

export function Spinner() {
    return (
        <BounceLoader color="#d1d1d1" speedMultiplier={2} />
    )
}

export function SpinnerDeleting() {
    return (
        <BounceLoader color="#FF5658" speedMultiplier={2} />
    )
}