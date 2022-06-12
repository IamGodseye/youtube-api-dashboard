import React, { useEffect, useState } from 'react'
import { API } from '../api'
import { toast } from 'react-toastify'
import axios from 'axios'

function Home() {
    const [search, setSearch] = useState('')
    const [video, setVideo] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`${API}/v2/video?page=${page}&limit=10&search=${search}`)
                if (data.ok === false) {
                    throw Error(data.message)
                }

                console.log(data.data.results);
                setVideo(data.data.results)
                console.log(video);
            }
            catch (error) {
                console.log(error)
                setVideo([])
                var s = error.message || 'Something went wrong...Try again...';
                toast.error(` ${s}`);
                setLoading(false);
            }
            // setSearch('')
        }
        fetchData()

    }, [page])
    const handleSearch = async (e) => {
        // if (src !== 'useEffect')
        e.preventDefault()
        try {

            setLoading(true)
            //http://localhost:5500/api/video?page=6&limit=5&search=would kind
            console.log(search.trim() !== '');
            if (search) setPage(1)
            console.log(page);
            const { data } = await axios.get(`${API}/v2/video?page=${page}&limit=10&search=${search}`)
            if (data.ok === false) {
                throw Error(data.message)
            }

            console.log(data.data.results);
            setVideo(data.data.results)
            console.log(video);
            // setSearch('')
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setVideo([])
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
            setLoading(false);
        }
    }
    return (
        <div className=' m-3'>
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <h3 style={{ textAlign: 'center' }}>Dashboard</h3>
                    <div class="input-group mb-3">
                        <span class="input-group-text"> VideoOP </span>
                        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button class='btn btn-primary' disabled={!search} onClick={handleSearch}>{loading ? "Loading..." : "Search"}</button>
                    </div>
                </div>
            </div>
            <div class='row'>
                {video.length > 0 ? video.map((v) =>
                (
                    <>
                        <div className='col-md-6 mt-2' style={{ color: 'black' }}>

                            <a href={`https://youtu.be/${v.videoId}`} target="_blank" style={{ textDecoration: "none" }}>
                                <div class="card">
                                    <img src={v.thumbnail.medium.url} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{v.title}</h5>
                                        <p class="card-text">{v.description.split(10)}</p>
                                    </div>
                                </div>
                            </a>
                        </div >
                    </>
                )
                ) : (
                    <>
                        <div class='col-md-6 offset-md-3 mt-2 alert alert-danger' role="alert">
                            No Videos Found....
                        </div>
                    </>)}
                <div class="d-flex justify-content-center mt-2">
                    <button class='m-2 btn btn-primary' disabled={loading} onClick={(e) => {
                        setPage(Math.max(1, page - 1))
                        // console.log(page);
                        // await handleSearch(e)
                    }}>Previous</button>
                    <button class='m-2 btn btn-primary' disabled={true}> {page}</button>
                    <button class='m-2 btn btn-primary' disabled={loading} onClick={(e) => {
                        setPage(page + 1)
                        console.log(page);
                        // await handleSearch(e)
                    }}>Next</button>
                </div>
            </div>

        </div >
    )
}

export default Home