
declare module Packages.logbook.dto {

    /**
     * �q���̏��
     * @author Nekopanda
     */
    class AirBattleDto {

        /** �U���V�[�P���X */
        atacks: Packages.java.util.List<BattleAtackDto>;

        /** �G�� [����, �G] */
        touchPlane: JavaArray<number>;

        /** ������ */
        seiku: string;

        /** stage1 �͍ڋ@�� [�������X�g, �����S, �G���X�g, �G�S] */
        stage1: JavaArray<number>;

        /** stage2 �͍ڋ@�� [�������X�g, �����S, �G���X�g, �G�S] */
        stage2: JavaArray<number>;

        getStage1ShortString(): JavaArray<string>;

        getStage2ShortString(): JavaArray<string>;

        getStage1DetailedString(): JavaArray<string>;

        getStage2DetailedString(): JavaArray<string>;

        /**
         * �G�ڕ\���𐶐� [�����E�G]
         * @param touchPlane
         * @return
         */
        getTouchPlane(): JavaArray<string>;
    }
}