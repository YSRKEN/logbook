
declare module Packages.logbook.dto {

    /**
     * ���̐퓬�t�F�[�Y��̃����N�i�\���l�j
     * @author Nekopanda
     */
    class ResultRank {

        /** ���S����S */
        static PERFECT: ResultRank;

        /** ����S */
        static S: ResultRank;

        /** ����A */
        static A: ResultRank;

        /** ��p�I����B */
        static B: ResultRank;

        /** ��p�I�s�kC */
        static C: ResultRank;

        /** �s�kD */
        static D: ResultRank;

        /** �s�kE */
        static E: ResultRank;

        rank(): string;
    }
}