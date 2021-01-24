import React, { lazy, useState, useEffect } from 'react';
import { fetchData } from 'actions/data';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import keys from 'config/keys';
import authHeader from 'services/auth-header';
import {
  CEmbedItem,
  CCard,
  CCardBody,
  CEmbed,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CTabs,
  CNavItem,
  CNavLink,
  CTabPane,
  CNav,
  CTabContent,
} from '@coreui/react';
import { CChartBar, CChartLine } from '@coreui/react-chartjs';
const Widgets = lazy(() => import('./Widgets.js'));

const Monitor = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      await dispatch(fetchData());
    }
    setPageLoading(true);
    let mounted = true;
    prepare().then(() => {
      if (mounted) {
        setPageLoading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //day data
  const [dayTempData, setDayTempData] = useState({
    beforeYesterday: 0,
    yesterday: 0,
    today: 0,
  });
  const [dayHumidityData, setDayHumidityData] = useState({
    beforeYesterday: 0,
    yesterday: 0,
    today: 0,
  });
  function initDayData() {
    let now = new Date(Date.now()).getTime();
    // let oneDayAgo = new Date(now - 1 * 24 * 60 * 60 * 1000).getTime();
    // let twoDayAgo = new Date(now - 2 * 24 * 60 * 60 * 1000).getTime();
    // let threeDayAgo = new Date(now - 3 * 24 * 60 * 60 * 1000).getTime();

    //minute
    let oneDayAgo = new Date(now - 1 * 60 * 1000).getTime();
    let twoDayAgo = new Date(now - 2 * 60 * 1000).getTime();
    let threeDayAgo = new Date(now - 3 * 60 * 1000).getTime();

    let cnt = 0;
    for (let i = 0; i < data.length; i++) {
      if (cnt == 3) break;
      let dataDate = new Date(data[i].created).getTime();
      if (dataDate < now && dataDate > oneDayAgo) {
        if (!dayTempData.today) {
          setDayTempData((prevValues) => {
            return {
              ...prevValues,
              today: data[i].temperature,
            };
          });
          setDayHumidityData((prevValues) => {
            return {
              ...prevValues,
              today: data[i].humidity,
            };
          });
          cnt++;
        }
      } else if (dataDate < oneDayAgo && dataDate > twoDayAgo) {
        if (!dayTempData.yesterday) {
          setDayTempData((prevValues) => {
            return {
              ...prevValues,
              yesterday: data[i].temperature,
            };
          });
          setDayHumidityData((prevValues) => {
            return {
              ...prevValues,
              yesterday: data[i].humidity,
            };
          });
          cnt++;
        }
      } else if (dataDate < twoDayAgo && dataDate > threeDayAgo) {
        if (!dayTempData.beforeYesterday) {
          setDayTempData((prevValues) => {
            return {
              ...prevValues,
              beforeYesterday: data[i].temperature,
            };
          });
          setDayHumidityData((prevValues) => {
            return {
              ...prevValues,
              beforeYesterday: data[i].humidity,
            };
          });
          cnt++;
        }
      }
    }
  }

  //hour data
  const [hourTempData, setHourTempData] = useState({
    curr: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
  });
  const [hourHumidityData, setHourHumidityData] = useState({
    curr: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
  });
  function initHourTempData() {
    let now = new Date(Date.now()).getTime();
    // let oneHourAgo = new Date(now - 1 * 60 * 60 * 1000).getTime();
    // let twoHourAgo = new Date(now - 2 * 60 * 60 * 1000).getTime();
    // let threeHourAgo = new Date(now - 3 * 60 * 60 * 1000).getTime();
    // let fourHourAgo = new Date(now - 4 * 60 * 60 * 1000).getTime();
    // let fiveHourAgo = new Date(now - 5 * 60 * 60 * 1000).getTime();
    // let sixHourAgo = new Date(now - 6 * 60 * 60 * 1000).getTime();
    // let sevenHourAgo = new Date(now - 7 * 60 * 60 * 1000).getTime();

    //minute
    let oneHourAgo = new Date(now - 1 * 60 * 1000).getTime();
    let twoHourAgo = new Date(now - 2 * 60 * 1000).getTime();
    let threeHourAgo = new Date(now - 3 * 60 * 1000).getTime();
    let fourHourAgo = new Date(now - 4 * 60 * 1000).getTime();
    let fiveHourAgo = new Date(now - 5 * 60 * 1000).getTime();
    let sixHourAgo = new Date(now - 6 * 60 * 1000).getTime();
    let sevenHourAgo = new Date(now - 7 * 60 * 1000).getTime();

    let cnt = 0;
    for (let i = 0; i < data.length; i++) {
      if (cnt == 7) break;
      let dataDate = new Date(data[i].created).getTime();
      if (dataDate < now && dataDate > oneHourAgo) {
        if (!hourTempData.curr) {
          setHourTempData((prevValues) => {
            return {
              ...prevValues,
              curr: data[i].temperature,
            };
          });
          setHourHumidityData((prevValues) => {
            return {
              ...prevValues,
              curr: data[i].humidity,
            };
          });
          cnt++;
        }
      } else if (dataDate < oneHourAgo && dataDate > twoHourAgo) {
        if (!hourTempData.one) {
          setHourTempData((prevValues) => {
            return {
              ...prevValues,
              one: data[i].temperature,
            };
          });
          setHourHumidityData((prevValues) => {
            return {
              ...prevValues,
              one: data[i].humidity,
            };
          });
          cnt++;
        }
      } else if (dataDate < twoHourAgo && dataDate > threeHourAgo) {
        if (!hourTempData.two) {
          setHourTempData((prevValues) => {
            return {
              ...prevValues,
              two: data[i].temperature,
            };
          });
          setHourHumidityData((prevValues) => {
            return {
              ...prevValues,
              two: data[i].humidity,
            };
          });
          cnt++;
        }
      } else if (dataDate < threeHourAgo && dataDate > fourHourAgo) {
        if (!hourTempData.three) {
          setHourTempData((prevValues) => {
            return {
              ...prevValues,
              three: data[i].temperature,
            };
          });
          setHourHumidityData((prevValues) => {
            return {
              ...prevValues,
              three: data[i].humidity,
            };
          });
          cnt++;
        }
      } else if (dataDate < fourHourAgo && dataDate > fiveHourAgo) {
        if (!hourTempData.four) {
          setHourTempData((prevValues) => {
            return {
              ...prevValues,
              four: data[i].temperature,
            };
          });
          setHourHumidityData((prevValues) => {
            return {
              ...prevValues,
              four: data[i].humidity,
            };
          });
          cnt++;
        }
      } else if (dataDate < fiveHourAgo && dataDate > sixHourAgo) {
        if (!hourTempData.five) {
          setHourTempData((prevValues) => {
            return {
              ...prevValues,
              five: data[i].temperature,
            };
          });
          setHourHumidityData((prevValues) => {
            return {
              ...prevValues,
              five: data[i].humidity,
            };
          });
          cnt++;
        }
      } else if (dataDate < sixHourAgo && dataDate > sevenHourAgo) {
        if (!hourTempData.six) {
          setHourTempData((prevValues) => {
            return {
              ...prevValues,
              six: data[i].temperature,
            };
          });
          setHourHumidityData((prevValues) => {
            return {
              ...prevValues,
              six: data[i].humidity,
            };
          });
          cnt++;
        }
      }
    }
  }
  useEffect(() => {
    initHourTempData();
    initDayData();

    //refresh data each 60 second
    setTimeout(() => {
      dispatch(fetchData());
    }, 60000);
  }, [data]);

  return (
    <>
      {/* Biểu đồ thống kê chung */}
      <Widgets />
      <CRow>
        {/* Biểu đồ nhiệt độ */}
        <CCol xs="12" md="6" className="mb-4">
          <CCard>
            <CCardHeader>Biểu đồ nhiệt độ</CCardHeader>
            <CCardBody>
              <CTabs activeTab="hour">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="hour">Theo giờ</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="day">Theo ngày</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="hour">
                    <CChartLine
                      type="line"
                      datasets={[
                        {
                          label: '°C',
                          // backgroundColor: '#ff7675',
                          borderColor: '#ff7675',
                          fill: false,
                          data: [
                            hourTempData.six,
                            hourTempData.five,
                            hourTempData.four,
                            hourTempData.three,
                            hourTempData.two,
                            hourTempData.one,
                            hourTempData.curr,
                          ],
                        },
                        {
                          label: '°F',
                          // backgroundColor: '#74b9ff',
                          borderColor: '#74b9ff',
                          fill: false,
                          data: [
                            hourTempData.six * 1.8 + 32,
                            hourTempData.five * 1.8 + 32,
                            hourTempData.four * 1.8 + 32,
                            hourTempData.three * 1.8 + 32,
                            hourTempData.two * 1.8 + 32,
                            hourTempData.one * 1.8 + 32,
                            hourTempData.curr * 1.8 + 32,
                          ],
                        },
                      ]}
                      labels={[
                        '6 giờ trước',
                        '5 giờ trước',
                        '4 giờ trước',
                        '3 giờ trước',
                        '2 giờ trước',
                        '1 giờ trước',
                        'Hiện tại',
                      ]}
                      options={{
                        tooltips: {
                          enabled: true,
                        },
                      }}
                    />
                  </CTabPane>
                  <CTabPane data-tab="day">
                    <CChartLine
                      type="line"
                      datasets={[
                        {
                          label: '°C',
                          backgroundColor: '#ff7675',
                          data: [
                            dayTempData.beforeYesterday,
                            dayTempData.yesterday,
                            dayTempData.today,
                          ],
                        },
                        {
                          label: '°F',
                          backgroundColor: '#74b9ff',
                          data: [
                            dayTempData.beforeYesterday * 1.8 + 32,
                            dayTempData.yesterday * 1.8 + 32,
                            dayTempData.today * 1.8 + 32,
                          ],
                        },
                      ]}
                      labels={['Hôm kia', 'Hôm qua', 'Hôm nay']}
                      options={{
                        tooltips: {
                          enabled: true,
                        },
                      }}
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
        {/* Biểu đồ nhiệt độ */}
        <CCol xs="12" md="6" className="mb-4">
          <CCard>
            <CCardHeader>Biểu đồ độ ẩm</CCardHeader>
            <CCardBody>
              <CTabs activeTab="hour">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="hour">Theo giờ</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="day">Theo ngày</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="hour">
                    <CChartBar
                      type="bar"
                      datasets={[
                        {
                          label: 'Độ ẩm',
                          backgroundColor: [
                            '#2bcbba',
                            '#0fb9b1',
                            '#45aaf2',
                            '#2d98da',
                            '#4b7bec',
                            '#3867d6',
                            '#a55eea',
                          ],
                          data: [
                            hourHumidityData.six,
                            hourHumidityData.five,
                            hourHumidityData.four,
                            hourHumidityData.three,
                            hourHumidityData.two,
                            hourHumidityData.one,
                            hourHumidityData.curr,
                          ], //50 để fix cho giá trị bé nhất
                        },
                      ]}
                      labels={[
                        '6 giờ trước',
                        '5 giờ trước',
                        '4 giờ trước',
                        '3 giờ trước',
                        '2 giờ trước',
                        '1 giờ trước',
                        'Hiện tại',
                      ]}
                      options={{
                        tooltips: {
                          enabled: true,
                        },
                      }}
                    />
                  </CTabPane>
                  <CTabPane data-tab="day">
                    <CChartBar
                      type="bar"
                      datasets={[
                        {
                          label: 'Độ ẩm',
                          backgroundColor: ['#45aaf2', '#2d98da', '#3867d6'],
                          data: [
                            dayHumidityData.beforeYesterday,
                            dayHumidityData.yesterday,
                            dayHumidityData.today,
                          ], //50 để fix cho giá trị bé nhất
                        },
                      ]}
                      labels={['Hôm kia', 'Hôm qua', 'Hôm nay']}
                      options={{
                        tooltips: {
                          enabled: true,
                        },
                      }}
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Phần video demo */}
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Video demo</CCardHeader>
            <CCardBody>
              <CEmbed>
                <CEmbedItem src="https://www.youtube.com/embed/psZ1g9fMfeo" />
              </CEmbed>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Monitor;
