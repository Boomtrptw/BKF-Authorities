import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
export const Dashboard = () => {
  const { searchText } = useOutletContext();
  const [dataList, setDataList] = useState([]);
  const apiUrl = import.meta.env.VITE_URL_API;

  const filteredData = dataList.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/syetem/get-bkf-system-all/`);
        const data = await response.json();
        setDataList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="box-container" style={{padding:"0"}}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          padding: "20px",
          backgroundColor: "#FFF",
          borderRadius: "10px",
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <a
              title={item.name}
              key={item.id}
              href={item.url}
              target="_blank"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                padding: "10px",
                border: "1px solid rgb(221, 221, 221)",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: "rgb(247, 247, 247)",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px",
                flexBasis: "calc(20% - 16px)",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  marginLeft: "20px",
                  fontSize: "16px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "250px",
                  display: "inline-block",
                }}
              >
                {item.name}
              </span>
            </a>
          ))
        ) : (
          <div style={{ width: "100%", textAlign: "center", color: "#999" }}>
            No Data
          </div>
        )}
      </div>
    </div>
  );
};
