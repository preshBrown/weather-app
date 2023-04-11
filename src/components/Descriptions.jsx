import React from "react";
import "./Descriptions.css";
import { FaArrowDown, FaArrowUp,  FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress,  MdOutlineWaterDrop } from "react-icons/md";

const Descriptions = (props) => {
    const {weather, units} = props;

    const tempUnit = units === "metric" ? "°C" : "°F";
    const windUnit = units === "metric" ? "m/s" : "m/h";


    const card = [
        {
            id: 1,
            icon: <FaArrowDown />,
            title: "min",
            data: weather.temp_min.toFixed(),
            unit: tempUnit
        },
        {
            id: 2,
            icon: <FaArrowUp />,
            title: "max",
            data: weather.temp_max.toFixed(),
            unit: tempUnit
        },
        {
            id: 3,
            icon: <BiHappy />,
            title: "feels like",
            data: weather.feels_like.toFixed(),
            unit: tempUnit
        },
        {
            id: 4,
            icon: <MdCompress />,
            title: "pressure",
            data: weather.pressure,
            unit: "hPa"
        },
        {
            id: 5,
            icon: <MdOutlineWaterDrop />,
            title: "humidity",
            data: weather.humidity,
            unit: "%"
        },
        {
            id: 6,
            icon: <FaWind />,
            title: "wind speed",
            data: weather.speed.toFixed(),
            unit: windUnit
        }
    ]


  return (
    <div className="section section__descriptions">
        {card.map(crd => (
            <div key={crd.id} className="card">
            <div className="description__card-icon">
                {crd.icon}
                <small>{crd.title}</small>
            </div>
            <h2>{`${crd.data} ${crd.unit}`}</h2>
        </div>
        ))}
    </div>
  )
}

export default Descriptions