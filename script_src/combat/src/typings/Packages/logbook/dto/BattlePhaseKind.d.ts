
declare module Packages.logbook.dto {

    /**
     * �퓬�t�F�[�Y�̎��
     * @author Nekopanda
     */
    class BattlePhaseKind {

        /** �ʏ�̒��� */
        static BATTLE: BattlePhaseKind;

        /** �ʏ�̖�� */
        static MIDNIGHT: BattlePhaseKind;

        /** ���K�̒��� */
        static PRACTICE_BATTLE: BattlePhaseKind;

        /** ���K�̖�� */
        static PRACTICE_MIDNIGHT: BattlePhaseKind;

        /** ���}�X�̐퓬 */
        static SP_MIDNIGHT: BattlePhaseKind;
        
        /** ��큨����}�X�̒��� */
        static NIGHT_TO_DAY: BattlePhaseKind;

        /** ��큨����}�X�̒��� */
        static AIR_BATTLE: BattlePhaseKind;

        /** �A���͑����@�������̒��� */
        static COMBINED_BATTLE: BattlePhaseKind;

        /** �A���͑��q���}�X */
        static COMBINED_AIR: BattlePhaseKind;

        /** �A���͑��̖�� */
        static COMBINED_MIDNIGHT: BattlePhaseKind;

        /** �A���͑��ł̖��}�X�̐퓬 */
        static COMBINED_SP_MIDNIGHT: BattlePhaseKind;

        /** �A���͑�����Ō������̒��� */
        static COMBINED_BATTLE_WATER: BattlePhaseKind;

        /**
         * ��킩�H
         * @return night
         */
        isNight(): boolean;

        /**
         * �J����͑��͑����s�����H
         * @return
         */
        isOpeningSecond(): boolean;

        /**
         * ���͑��͑����s�����H
         * @return
         */
        isHougekiSecond(): boolean;

        /**
         * �C����1�͑��͑����s�����H
         * @return
         */
        isHougeki1Second(): boolean;

        /**
         * �C����2�͑��͑����s�����H
         * @return
         */
        isHougeki2Second(): boolean;

        /**
         * �C����3�͑��͑����s�����H
         * @return
         */
        isHougeki3Second(): boolean;

        /**
         * ������͑��͑����s�����H
         * @return
         */
        isRaigekiSecond(): boolean;

        /**
         * ���̐퓬��API���N�G�X�g��
         * @return api
         */
        getApi(): Packages.logbook.data.DataType;

        /**
         * @return practice
         */
        isPractice(): boolean;
    }
}