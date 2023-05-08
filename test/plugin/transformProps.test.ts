/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ChartProps } from '@superset-ui/core';
import transformProps from '../../src/plugin/transformProps';

describe('SupersetPluginChartBaiduMap transformProps', () => {
  const formData = {
    colorScheme: 'bnbColors',
    datasource: '3__table',
    granularity_sqla: 'ds',
    metric: 'sum__num',
    series: 'name',
    initZoom: 5,
    enableZoom: true,
    centerLon: 104.114129,
    centerLat: 37.550339,
    useIcon: 2,
    lienSvg: 'lienSvg',
    symbolSize: 15,
    defaultIcon: 'circle',
    defaultIconColor: 'red',
    lonColumn: 'string',
    latColumn: 'string',
    situationColumn: 'string',
    adresseColumn: 'string',
  };
  const chartProps = new ChartProps({
    formData,
    width: 800,
    height: 600,
    queriesData: [{
      data: [{ name: 'Hulk', sum__num: 1 }],
    }],
  });

  it('should transform chart props for viz', () => {
    expect(transformProps(chartProps)).toEqual({
      width: 800,
      height: 600,
      initZoom: 5,
      enableZoom: true,
      data: [{ name: 'Hulk', sum__num: 1 }],
      centerLon: 104.114129,
      centerLat: 37.550339,
      useIcon: 2,
      lienSvg: 'lienSvg',
      symbolSize: 15,
      defaultIcon: 'circle',
      defaultIconColor: 'red',
      lonColumn: 'string',
      latColumn: 'string',
      situationColumn: 'string',
      adresseColumn: 'string',
    });
  });
});
