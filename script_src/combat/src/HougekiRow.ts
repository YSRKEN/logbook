﻿import * as _ from 'lodash';
import PhaseRow from './PhaseRow';
import ShipRow from './ShipRow';
import PhaseStatus from './PhaseStatus';
import Ships from './Ships';
import JavaString = Packages.java.lang.String;
import JavaInteger = Packages.java.lang.Integer;
import JavaList = Packages.java.util.List;
import DateTimeString = Packages.logbook.gui.logic.DateTimeString;
import BattleExDto = Packages.logbook.dto.BattleExDto;
import ShipBaseDto = Packages.logbook.dto.ShipBaseDto;
import ShipDto = Packages.logbook.dto.ShipDto;
import EnemyShipDto = Packages.logbook.dto.EnemyShipDto;
import ItemDto = Packages.logbook.dto.ItemDto;
import ItemInfoDto = Packages.logbook.dto.ItemInfoDto;
import BattleAtackDto = Packages.logbook.dto.BattleAtackDto;
import PhaseApi = combat.PhaseApi;

type ComparableArray = JavaArray<any>;
type ComparableArrayArray = JavaArray<ComparableArray>;

export default class HougekiRow {

    static header() {
        var row = _.clone(PhaseRow.header());
        row.push.apply(row, [
            '戦闘種別'
            , '自艦隊'
            , '巡目'
            , '砲撃種別'
            , '表示装備1'
            , '表示装備2'
            , '表示装備3'
            , 'クリティカル'
            , 'ダメージ'
            , 'かばう'
        ]);
        row.push.apply(row, _.map(ShipRow.header(), (s) => ('攻撃艦.' + s)));
        row.push.apply(row, _.map(ShipRow.header(), (s) => ('防御艦.' + s)));
        return row;
    }

    static body(battleExDto: BattleExDto, phaseStatus: PhaseStatus, phaseDto: BattleExDto.Phase, phaseApi: PhaseApi, hougekiIndex: number) {
        var kindDto = phaseDto.getKind();
        var isHougeki1Second = kindDto.isHougeki1Second();
        var isHougeki2Second = kindDto.isHougeki2Second();
        var isHougeki3Second = kindDto.isHougeki3Second();
        if (hougekiIndex === 1) {
            var fleetStatusList = phaseStatus.hougeki1FleetsStatusList;
            var api_hougeki = phaseApi.api_hougeki1;
            var isSecond = isHougeki1Second;
        }
        else if (hougekiIndex === 2) {
            var fleetStatusList = phaseStatus.hougeki2FleetsStatusList;
            var api_hougeki = phaseApi.api_hougeki2;
            var isSecond = isHougeki2Second;
        }
        else if (hougekiIndex === 3) {
            var fleetStatusList = phaseStatus.hougeki3FleetsStatusList;
            var api_hougeki = phaseApi.api_hougeki3;
            var isSecond = isHougeki3Second;
        }
        if (battleExDto.isCombined()) {
            if (isSecond) {
                var fleetName = '連合第2艦隊';
            }
            else {
                var fleetName = '連合第1艦隊';
            }
        }
        else {
            var fleetName = '通常艦隊';
        }
        if (isSecond === isHougeki1Second) {
            var hougekiCount = hougekiIndex;
        }
        else {
            var hougekiCount = hougekiIndex - 1;
        }
        var rows = <any[][]>[];
        if (api_hougeki != null) {
            for (var i = 1; i < api_hougeki.api_at_list.length; ++i) {
                var ships = new Ships(battleExDto, phaseStatus, fleetStatusList[i - 1]);
                var phaseRow = PhaseRow.body(battleExDto, phaseDto, phaseApi, ships.itemInfos);
                if (isSecond) {
                    var friendShips = battleExDto.getDockCombined().getShips();
                    var friendShipRows = ships.friendCombinedShipRows;
                }
                else {
                    var friendShips = battleExDto.getDock().getShips();
                    var friendShipRows = ships.friendRows;
                }
                var enemyShips = battleExDto.getEnemy();
                var enemyShipRows = ships.enemyRows;
                var api_at = api_hougeki.api_at_list[i];
                var api_at_type = api_hougeki.api_at_type[i];
                var api_df_list = api_hougeki.api_df_list[i];
                var api_si_list = api_hougeki.api_si_list[i];
                var api_cl_list = api_hougeki.api_cl_list[i];
                var api_damage = api_hougeki.api_damage[i];
                if (api_at < 7) {
                    var itemInfoDtos = friendShips[api_at - 1].getItem();
                }
                else {
                    var itemInfoDtos = battleExDto.getEnemy()[api_at - 7].getItem();
                }
                var itemNames = _.map(api_si_list, (api_si) => {
                    var itemDto = _.find(itemInfoDtos, (itemInfoDto) => itemInfoDto != null ? itemInfoDto.getId() == api_si : false);
                    if (itemDto != null) {
                        return itemDto.getName();
                    }
                    else {
                        return null;
                    }
                });
                for (var j = 0; j < api_df_list.length; ++j) {
                    var api_df = api_df_list[j];
                    var damage = JavaInteger.valueOf(api_damage[j]);
                    var row = _.clone(phaseRow);
                    row.push.apply(row, [
                        '砲撃戦'
                        , fleetName
                        , hougekiCount
                        , api_at_type
                        , itemNames[0]
                        , itemNames[1]
                        , itemNames[2]
                        , JavaInteger.valueOf(api_cl_list[j])
                        , damage
                        , damage != api_damage[j] ? 1 : 0
                    ]);
                    if (api_at < 7) {
                        row.push.apply(row, friendShipRows[api_at - 1]);
                    }
                    else {
                        row.push.apply(row, ships.enemyRows[api_at - 7]);
                    }
                    if (api_df < 7) {
                        row.push.apply(row, friendShipRows[api_df - 1]);
                    }
                    else {
                        row.push.apply(row, ships.enemyRows[api_df - 7]);
                    }
                    rows.push(row);
                }
            }
        }
        return rows;
    }
}
