import { RingLoader } from 'react-spinners'


function Loader() {
    return (
        <div className='global-loading'>
            <RingLoader
                color="#00079b"
                size={130}
            />

        </div>
    )
}

export default Loader