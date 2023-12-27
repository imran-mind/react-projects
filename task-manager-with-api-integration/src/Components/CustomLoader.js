import { CircularProgress } from "@mui/material"


const CustomLoader = (props) => {
    const { size, thickness, color } = props;
    return <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <CircularProgress
            size={size || 100}
            thickness={thickness || 3}
            color={color || "inherit"}
        />
    </div>
}

export default CustomLoader;