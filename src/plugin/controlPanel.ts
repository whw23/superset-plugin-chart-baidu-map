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
import {
  t,
  validateNonEmpty,
  validateNumber
} from '@superset-ui/core';
import {
  ControlPanelConfig,
  sections,
  sharedControls
} from '@superset-ui/chart-controls';
import {
  ControlPanelsContainerProps
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (translated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an integer or decimal value
   */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'lon_column',
            config: {
              ...sharedControls.series,
              label: t('Longitude'),
              description: t('Column containing longitude data'),
            },
          },
        ],
        [
          {
            name: 'lat_column',
            config: {
              ...sharedControls.series,
              label: t('Latitude'),
              description: t('Column containing latitude data'),
            },
          },
        ],
        [
          {
            name: 'situation_column',
            config: {
              ...sharedControls.series,
              label: t('机构名称'),
              description: t('可以在这里放入名称列'),
            },
          },
        ],
        [
          {
            name: 'adresse_column',
            config: {
              ...sharedControls.series,
              label: t('地址'),
              description: t('可以在这里放入地址列'),
            },
          },
        ],
        [
          {
            name: 'cols',
            config: {
              ...sharedControls.groupby,
              label: t('Columns'),
              description: t('Columns to group by'),
            },
          },
        ],
        [
          {
            name: 'metrics',
            config: {
              ...sharedControls.metrics,
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],
        ['adhoc_filters'],
        ['row_limit'],
      ],
    },
    {
      label: t('百度地图设置'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'center_lon',
            config: {
              type: 'TextControl',
              renderTrigger: true,
              label: t('Default longitude'),
              default: 104.114129,
              description: t('初始化时中心点经度'),
              validators: [validateNumber],
            }
          }
        ],
        [
          {
            name: 'center_lat',
            config: {
              type: 'TextControl',
              renderTrigger: true,
              label: t('Default latitude'),
              default: 37.550339,
              description: t('初始化时中心点纬度'),
              validators: [validateNumber],
            }
          }
        ],
        [
          {
            name: 'init_zoom',
            config: {
              type: 'SliderControl',
              default: 5,
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Zoom'),
              description: t('初始化时缩放等级'),
              min: 4,
              max: 14,
            },
          },
        ],
        [
          {
            name: 'enable_zoom',
            config: {
              type: 'CheckboxControl',
              label: t('Zoom'),
              renderTrigger: true,
              default: true,
              description: t('选中表示允许缩放'),
            },
          },
        ],
        [
          {
            name: 'use_icon',
            config: {
              type: 'SelectControl',
              label: t('使用图标'),
              default: 1,
              choices: [
                // [value, label]
                [1, '使用百度地图默认图标'],
                [2, '风车图标'],
                [3, '使用url或dataURI图标']
              ],
              renderTrigger: true,
              description: t('设置图标种类'),
            },
          },
        ],
        [
          {
            name: 'default_icon',
            config: {
              type: 'SelectControl',
              label: t('选择默认图标'),
              default: 'circle',
              choices: [
                // [value, label]
                ['circle', 'circle'],
                ['rect', 'rect'],
                ['roundRect', 'roundRect'],
                ['triangle', 'triangle'],
                ['diamond', 'diamond'],
                ['pin', 'pin'],
                ['arrow', 'arrow'],
                ['none', 'none'],
              ],
              renderTrigger: true,
              description: t('设置默认图标种类'),
              visibility: ({ controls }: ControlPanelsContainerProps) => {
                return controls?.use_icon?.value === 1
              }
            },
          },
        ],
        [
          {
            name: 'default_icon_color',
            config: {
              type: 'ColorPickerControl',
              label: t('默认图标颜色'),
              renderTrigger: true,
              description: t('默认图标颜色'),
              visibility: ({ controls }: ControlPanelsContainerProps) => {
                return controls?.use_icon?.value === 1
              }
            },
          },
        ],
        [
          {
            name: 'lien_svg',
            config: {
              type: 'TextControl',
              renderTrigger: true,
              label: t('图片链接'),
              default: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
              description: t('通过url或dataURI设置，url为在线图片链接，dataURI为基于xxx编码的图片的数据URI。具体参考https://echarts.apache.org/zh/option.html#series-line.symbol\n文本框中仅保留image://后的内容，不保留image://\n\n一个基于base64编码的GIF图片的数据URI例子：\ndata:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'),
              visibility: ({ controls }: ControlPanelsContainerProps) => {
                return controls?.use_icon?.value === 3
              }
            }
          }
        ],
        [
          {
            name: 'symbol_size',
            config: {
              type: 'SliderControl',
              default: 15,
              renderTrigger: true,
              label: t('图标大小'),
              description: t('图标大小'),
              min: 1,
              max: 100,
            },
          },
        ],
      ],
    },
  ],
};

export default config;
