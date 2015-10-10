/// <reference path="logbook.d.ts" />
var combat;
(function (combat) {
    load('script/combat/lodash.js');
    var JavaString = Packages.java.lang.String;
    var DateTimeString = Packages.logbook.gui.logic.DateTimeString;
    var ShipDto = Packages.logbook.dto.ShipDto;
    var DayPhaseRow = (function () {
        function DayPhaseRow() {
        }
        DayPhaseRow.header = function () {
            var row = PhaseRow.header();
            row.push.apply(row, [
                '自索敵',
                '敵索敵',
                '制空権',
                '会敵',
                '自昼触接',
                '敵昼触接'
            ]);
            return row;
        };
        DayPhaseRow.body = function (battleExDto, phaseDto, phaseApi, itemInfos) {
            var row = PhaseRow.body(battleExDto);
            var sakuteki = battleExDto.getSakuteki();
            if (sakuteki != null) {
                var sakuteki0 = sakuteki[0];
                var sakuteki1 = sakuteki[1];
            }
            row.push(sakuteki0);
            row.push(sakuteki1);
            var phaseDto = battleExDto.getPhase1();
            if (phaseDto != null) {
                var airBattleDto = phaseDto.getAir();
                if (airBattleDto != null) {
                    var seiku = airBattleDto.seiku;
                }
            }
            row.push(seiku);
            row.push(battleExDto.getFormationMatch());
            var touchPlane = phaseDto.getTouchPlane();
            if (touchPlane != null) {
                var touchPlane0 = itemInfos.getName(touchPlane[0]);
                var touchPlane1 = itemInfos.getName(touchPlane[1]);
            }
            row.push(touchPlane0);
            row.push(touchPlane1);
            return row;
        };
        return DayPhaseRow;
    })();
    combat.DayPhaseRow = DayPhaseRow;
    var NightPhaseRow = (function () {
        function NightPhaseRow() {
        }
        NightPhaseRow.header = function () {
            var row = PhaseRow.header();
            row.push.apply(row, [
                '自夜触接',
                '敵夜触接',
                '自照明弾',
                '敵照明弾'
            ]);
            return row;
        };
        NightPhaseRow.body = function (battleExDto, phaseDto, phaseApi, itemInfos) {
            var row = PhaseRow.body(battleExDto);
            var touchPlane = phaseDto.getTouchPlane();
            if (touchPlane != null) {
                var touchPlane0 = itemInfos.getName(touchPlane[0]);
                var touchPlane1 = itemInfos.getName(touchPlane[1]);
            }
            row.push(touchPlane0);
            row.push(touchPlane1);
            var api_flare_pos = phaseApi.api_flare_pos;
            if (api_flare_pos != null) {
                var api_flare_pos0 = api_flare_pos[0];
                if (api_flare_pos0 >= 0) {
                    var flarePos0 = api_flare_pos0;
                }
                var api_flare_pos1 = api_flare_pos[1];
                if (api_flare_pos1 >= 0) {
                    var flarePos1 = api_flare_pos1;
                }
            }
            row.push(flarePos0);
            row.push(flarePos1);
            return row;
        };
        return NightPhaseRow;
    })();
    combat.NightPhaseRow = NightPhaseRow;
    var PhaseRow = (function () {
        function PhaseRow() {
        }
        PhaseRow.header = function () {
            return [
                '日付',
                '海域',
                'マス',
                '出撃',
                'ランク',
                '敵艦隊',
                '提督レベル',
                '自陣形',
                '敵陣形'
            ];
        };
        PhaseRow.body = function (battleExDto) {
            var row = [];
            var battleDate = battleExDto.getBattleDate();
            if (battleDate != null) {
                var battleDateTimeString = new DateTimeString(battleDate);
            }
            row.push(battleDateTimeString);
            row.push(battleExDto.getQuestName());
            var mapCellDto = battleExDto.getMapCellDto();
            if (mapCellDto != null) {
                var reportString = mapCellDto.getReportString();
                var bossTexts = [];
                if (mapCellDto.isStart()) {
                    bossTexts.push('出撃');
                }
                if (mapCellDto.isBoss()) {
                    bossTexts.push('ボス');
                }
                var bossText = bossTexts.join('&');
            }
            row.push(reportString);
            row.push(bossText);
            row.push(battleExDto.getRank());
            row.push(battleExDto.getEnemyName());
            row.push(battleExDto.getHqLv());
            var formation = battleExDto.getFormation();
            if (formation != null) {
                var formation0 = formation[0];
                var formation1 = formation[1];
            }
            row.push(formation0);
            row.push(formation1);
            return row;
        };
        return PhaseRow;
    })();
    combat.PhaseRow = PhaseRow;
    var ItemInfos = (function () {
        function ItemInfos() {
            this.dtos = {};
        }
        ItemInfos.prototype.getName = function (id) {
            var dto = this.dtos[id];
            if (dto != null) {
                return dto.getName();
            }
        };
        return ItemInfos;
    })();
    combat.ItemInfos = ItemInfos;
    var Ships = (function () {
        function Ships(battleExDto, body) {
            var _this = this;
            if (body === void 0) { body = ShipRow.body; }
            this.itemInfos = new ItemInfos();
            var construct = function (shipDtos) {
                var shipRows = [];
                for (var i = 0; i < 6; ++i) {
                    shipDto = null;
                    if (shipDtos != null && i < shipDtos.length) {
                        var shipDto = shipDtos[i];
                        if (shipDto != null) {
                            var itemInfoDtos = shipDto.getItem();
                            if (itemInfoDtos != null) {
                                _.forEach(itemInfoDtos, function (itemInfoDto) {
                                    if (itemInfoDto != null) {
                                        _this.itemInfos.dtos[itemInfoDto.getId()] = itemInfoDto;
                                    }
                                });
                            }
                        }
                    }
                    shipRows.push(body(shipDto));
                }
                return shipRows;
            };
            var dockDto = battleExDto.getDock();
            if (dockDto != null) {
                this.friendRows = construct(dockDto.getShips());
            }
            var dockCombinedDto = battleExDto.getDockCombined();
            if (dockCombinedDto != null) {
                this.friendCombinedShipRows = construct(dockCombinedDto.getShips());
            }
            this.enemyRows = construct(battleExDto.getEnemy());
        }
        return Ships;
    })();
    combat.Ships = Ships;
    var ShipRow = (function () {
        function ShipRow() {
        }
        ShipRow.header = function () {
            var row = [
                'ID',
                '名前',
                '種別',
                '疲労',
                '残り燃料',
                '最大燃料',
                '残り弾薬',
                '最大弾薬',
                'Lv',
                '速力',
                '火力',
                '雷装',
                '対空',
                '装甲',
                '回避',
                '対潜',
                '索敵',
                '運',
                '射程'
            ];
            row.push.apply(row, ItemRow.header());
            return row;
        };
        ShipRow.body = function (shipBaseDto) {
            if (shipBaseDto != null) {
                var row = [];
                var shipInfoDto = shipBaseDto.getShipInfo();
                if (shipInfoDto != null) {
                    var shipId = shipInfoDto.getShipId();
                    var fullName = shipInfoDto.getFullName();
                    var type = shipInfoDto.getType();
                    var maxFuel = shipInfoDto.getMaxFuel();
                    var maxBull = shipInfoDto.getMaxBull();
                }
                if (shipBaseDto instanceof ShipDto) {
                    var shipDto = shipBaseDto;
                    var cond = shipDto.getCond();
                    var fuel = shipDto.getFuel();
                    var bull = shipDto.getBull();
                }
                var shipParamDto = shipBaseDto.getParam();
                if (shipParamDto != null) {
                    switch (shipParamDto.getSoku()) {
                        case 0:
                            var soku = '陸上';
                            break;
                        case 5:
                            var soku = '低速';
                            break;
                        case 10:
                            var soku = '高速';
                            break;
                    }
                    var houg = shipParamDto.getHoug();
                    var raig = shipParamDto.getRaig();
                    var taik = shipParamDto.getTaik();
                    var souk = shipParamDto.getSouk();
                    var kaih = shipParamDto.getKaih();
                    var tais = shipParamDto.getTais();
                    var saku = shipParamDto.getSaku();
                    var luck = shipParamDto.getLuck();
                    switch (shipParamDto.getLeng()) {
                        case 0:
                            var leng = '超短';
                            break;
                        case 1:
                            var leng = '短';
                            break;
                        case 2:
                            var leng = '中';
                            break;
                        case 3:
                            var leng = '長';
                            break;
                        case 4:
                            var leng = '超長';
                            break;
                    }
                }
                row.push(shipId);
                row.push(fullName);
                row.push(type);
                row.push(cond);
                row.push(fuel);
                row.push(maxFuel);
                row.push(bull);
                row.push(maxBull);
                row.push(shipBaseDto.getLv());
                row.push(soku);
                row.push(houg);
                row.push(raig);
                row.push(taik);
                row.push(souk);
                row.push(kaih);
                row.push(tais);
                row.push(saku);
                row.push(luck);
                row.push(leng);
                row.push.apply(row, ItemRow.body(shipBaseDto));
                return row;
            }
            else {
                return new Array(this.header().length);
            }
        };
        return ShipRow;
    })();
    combat.ShipRow = ShipRow;
    var ItemRow = (function () {
        function ItemRow() {
        }
        ItemRow.header = function () {
            var row = [];
            for (var i = 1; i <= 5; ++i) {
                row.push.apply(row, _.map([
                    '名前',
                    '改修',
                    '熟練度',
                    '搭載数'
                ], function (s) { return ('装備' + i + '.' + s); }));
            }
            return row;
        };
        ItemRow.body = function (shipBaseDto) {
            var construct = function (itemDto, itemInfoDto, onSlot) {
                if (itemInfoDto != null) {
                    var name = itemInfoDto.getName();
                    var level = (itemDto != null) ? itemDto.getLevel() : null;
                    var alv = (itemDto != null) ? itemDto.getAlv() : null;
                }
                return [
                    name,
                    level,
                    alv,
                    onSlot
                ];
            };
            var row = [];
            if (shipBaseDto != null) {
                if (shipBaseDto instanceof ShipDto) {
                    var shipDto = (shipBaseDto);
                    var itemDtos = shipDto.getItem2();
                    var itemExDto = shipDto.getSlotExItem();
                    if (itemExDto != null) {
                        var itemInfoExDto = itemExDto.getInfo();
                    }
                }
                var itemInfoDtos = shipBaseDto.getItem();
                var onSlots = shipBaseDto.getOnSlot();
            }
            for (var i = 0; i < 5; ++i) {
                if (i === 4 && itemExDto != null && itemInfoExDto != null) {
                    var itemRow = construct(itemExDto[i], itemInfoExDto[i], null);
                }
                else if (itemInfoDtos != null && i < itemInfoDtos.length) {
                    if (onSlots != null && i < onSlots.length) {
                        var onSlot = onSlots[i];
                    }
                    if (itemDtos != null && i < itemDtos.length) {
                        var itemRow = construct(itemDtos[i], itemInfoDtos[i], onSlot);
                    }
                    else {
                        var itemRow = construct(null, itemInfoDtos[i], onSlot);
                    }
                }
                else {
                    var itemRow = construct(null, null, null);
                }
                row.push.apply(row, itemRow);
            }
            return row;
        };
        return ItemRow;
    })();
    combat.ItemRow = ItemRow;
    // javascriptの配列をそのまま返すと遅いので
    // Comparable[]に変換しておく
    // undefinedはnullに変換される
    function toComparable(sourceRows) {
        var ComparableType = Java.type('java.lang.Comparable');
        var ComparableArrayType = Java.type('java.lang.Comparable[]');
        var ComparableArrayArrayType = Java.type('java.lang.Comparable[][]');
        var targetRows = new ComparableArrayArrayType(sourceRows.length);
        for (var j = 0; j < sourceRows.length; ++j) {
            var sourceRow = sourceRows[j];
            var targetRow = new ComparableArrayType(sourceRow.length);
            for (var i = 0; i < sourceRow.length; ++i) {
                var source = sourceRow[i];
                if (source == null) {
                    targetRow[i] = null;
                }
                else if (source instanceof ComparableType) {
                    targetRow[i] = source;
                }
                else {
                    targetRow[i] = JavaString.valueOf(source);
                }
            }
            targetRows[j] = targetRow;
        }
        return targetRows;
    }
    combat.toComparable = toComparable;
})(combat || (combat = {}));
/// <reference path="../combat/combat.ts" />
var combat;
(function (combat) {
    var DropItem;
    (function (DropItem) {
        var DateTimeString = Packages.logbook.gui.logic.DateTimeString;
        var ShipDto = Packages.logbook.dto.ShipDto;
        var Table = (function () {
            function Table() {
            }
            Table.header = function () {
                var row = PhaseRow.header();
                row.push.apply(row, FleetRow.header());
                return row;
            };
            Table.body = function (battleExDto) {
                var rows = [];
                var ships = new combat.Ships(battleExDto, ShipRow.body);
                var phaseRow = PhaseRow.body(battleExDto);
                rows.push.apply(rows, FleetRow.body(battleExDto, ships));
                rows.push.apply(rows, FleetRow.body(battleExDto, ships));
                _.forEach(rows, function (row) { return (row.unshift.apply(row, phaseRow)); });
                return combat.toComparable(rows);
            };
            return Table;
        })();
        DropItem.Table = Table;
        var PhaseRow = (function () {
            function PhaseRow() {
            }
            PhaseRow.header = function () {
                return [
                    '日付',
                    '海域',
                    'マス',
                    '出撃',
                    'ランク',
                    '敵艦隊',
                    '提督レベル',
                    '夜戦',
                    'ドロップアイテム'
                ];
            };
            PhaseRow.body = function (battleExDto) {
                var row = [];
                var battleDate = battleExDto.getBattleDate();
                if (battleDate != null) {
                    var battleDateTimeString = new DateTimeString(battleDate);
                }
                row.push(battleDateTimeString);
                row.push(battleExDto.getQuestName());
                var mapCellDto = battleExDto.getMapCellDto();
                if (mapCellDto != null) {
                    var reportString = mapCellDto.getReportString();
                    var bossTexts = [];
                    if (mapCellDto.isStart()) {
                        bossTexts.push('出撃');
                    }
                    if (mapCellDto.isBoss()) {
                        bossTexts.push('ボス');
                    }
                    var bossText = bossTexts.join('&');
                }
                row.push(reportString);
                row.push(bossText);
                row.push(battleExDto.getRank());
                row.push(battleExDto.getEnemyName());
                row.push(battleExDto.getHqLv());
                var formation = battleExDto.getFormation();
                if (formation != null) {
                    var formation0 = formation[0];
                    var formation1 = formation[1];
                }
                row.push(_.any(_.filter(battleExDto.getPhaseList(), function (phaseDto) { return phaseDto.getKind().isNight(); })));
                row.push(battleExDto.getDropItemName());
                return row;
            };
            return PhaseRow;
        })();
        DropItem.PhaseRow = PhaseRow;
        var ItemRow = (function () {
            function ItemRow() {
            }
            ItemRow.header = function () {
                var row = [];
                for (var i = 1; i <= 5; ++i) {
                    row.push.apply(row, _.map([
                        '名前'
                    ], function (s) { return ('装備' + i + '.' + s); }));
                }
                return row;
            };
            ItemRow.body = function (shipBaseDto) {
                var construct = function (itemDto, itemInfoDto, onSlot) {
                    if (itemInfoDto != null) {
                        var name = itemInfoDto.getName();
                    }
                    return [
                        name
                    ];
                };
                var row = [];
                if (shipBaseDto != null) {
                    if (shipBaseDto instanceof ShipDto) {
                        var shipDto = (shipBaseDto);
                        var itemDtos = shipDto.getItem2();
                        var itemExDto = shipDto.getSlotExItem();
                        if (itemExDto != null) {
                            var itemInfoExDto = itemExDto.getInfo();
                        }
                    }
                    var itemInfoDtos = shipBaseDto.getItem();
                    var onSlots = shipBaseDto.getOnSlot();
                }
                for (var i = 0; i < 5; ++i) {
                    if (i === 4 && itemExDto != null && itemInfoExDto != null) {
                        var itemRow = construct(itemExDto[i], itemInfoExDto[i], null);
                    }
                    else if (itemInfoDtos != null && i < itemInfoDtos.length) {
                        if (onSlots != null && i < onSlots.length) {
                            var onSlot = onSlots[i];
                        }
                        if (itemDtos != null && i < itemDtos.length) {
                            var itemRow = construct(itemDtos[i], itemInfoDtos[i], onSlot);
                        }
                        else {
                            var itemRow = construct(null, itemInfoDtos[i], onSlot);
                        }
                    }
                    else {
                        var itemRow = construct(null, null, null);
                    }
                    row.push.apply(row, itemRow);
                }
                return row;
            };
            return ItemRow;
        })();
        DropItem.ItemRow = ItemRow;
        var ShipRow = (function () {
            function ShipRow() {
            }
            ShipRow.header = function () {
                var row = [
                    'ID',
                    '名前',
                    'Lv'
                ];
                row.push.apply(row, ItemRow.header());
                return row;
            };
            ShipRow.body = function (shipBaseDto) {
                var row = [];
                if (shipBaseDto != null) {
                    var shipInfoDto = shipBaseDto.getShipInfo();
                    if (shipInfoDto != null) {
                        var shipId = shipInfoDto.getShipId();
                        var fullName = shipInfoDto.getFullName();
                    }
                    var lv = shipBaseDto.getLv();
                }
                row.push(shipId);
                row.push(fullName);
                row.push(lv);
                row.push.apply(row, ItemRow.body(shipBaseDto));
                return row;
            };
            return ShipRow;
        })();
        DropItem.ShipRow = ShipRow;
        var FleetRow = (function () {
            function FleetRow() {
            }
            FleetRow.header = function () {
                var row = [];
                _.forEach(['自艦', '敵艦'], function (x) {
                    for (var i = 1; i <= 6; ++i) {
                        var shipRow = [];
                        shipRow.push.apply(shipRow, ShipRow.header());
                        row.push.apply(row, _.map(shipRow, function (y) { return (x + i + '.' + y); }));
                    }
                });
                return row;
            };
            FleetRow.body = function (battleExDto, ships) {
                var rows = [];
                var row = [];
                var construct = function (shipRows) {
                    var row = [];
                    for (var i = 1; i <= 6; ++i) {
                        row.push.apply(row, shipRows[i - 1]);
                    }
                    return row;
                };
                row.push.apply(row, construct(ships.friendRows));
                row.push.apply(row, construct(ships.enemyRows));
                rows.push(row);
                return rows;
            };
            return FleetRow;
        })();
        DropItem.FleetRow = FleetRow;
    })(DropItem = combat.DropItem || (combat.DropItem = {}));
})(combat || (combat = {}));
function begin() {
}
function end() {
}
function header() {
    return combat.DropItem.Table.header();
}
function body(battleExDto) {
    return combat.DropItem.Table.body(battleExDto);
}
