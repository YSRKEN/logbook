﻿
declare module combat {

    interface NightHougekiBattleApi {

        /** 行動順 ? */
        api_at_list: number[];

        /** 防御側ID 　- 1から始まる　連撃は2個 */
        api_df_list: number[][];

        /** 表示装備ID　カットインだと[0] = 偵察機, [1] = 砲, [2] = 砲 | 電探 | その他, 連撃だと[0] = 装備1, [1] = 装備2, 通常砲撃は[0] = 装備1 非表示は- 1 */
        api_si_list: number[][];

        /** クリティカルヒット表示？ */
        api_cl_list: number[][];

        /** 特殊砲撃フラグ？ */
        api_sp_list: number[];

        /** ダメージ(実ダメージ) */
        api_damage: number[][];
    }
}