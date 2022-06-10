import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/shared/Spinner'
import axios from 'axios'
import TopCard from '../components/Coin/TopCard'
import Chart from '../components/Coin/Chart'
import {useNavigate} from 'react-router-dom'

const Coin = () => {
  const [coinLoading, setIsCoinLoading] = useState(true)
  const [coinChartData, setCoinChartData] = useState([])
  const [coin, setCoin] = useState([])
  const {coinId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getCoin = async (coinId) => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        )
        setCoin(response.data)
        setIsCoinLoading(false)
      } catch (err) {
        navigate('/notfound')
        console.log(err)
      }
    }
    getCoin(coinId)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const getCoinChartData = async (coinId) => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=cad&days=89&interval=daily`
        )
        setCoinChartData(response.data.prices)
      } catch (err) {
        console.log(err)
      }
    }
    getCoinChartData(coinId)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {coinLoading && (
        <div className='w-full bg-[#f7f7f5] h-screen'>
          <div className='container m-auto flex just-center items-center'>
            <Spinner />
          </div>
        </div>
      )}
      <div className='w-full bg-[#f7f7f5] min-h-screen max-h-min '>
        <div className='container m-auto pt-10'>
          {!coinLoading && (
            <>
              <TopCard coin={coin} />
              <Chart coinChartData={coinChartData} coin={coin} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Coin
