
declare module Packages.logbook.dto {

    /**
     * �U���V�[�P���X
     * @author Nekopanda
     */
    class BattleAtackDto {

        /** �U���̎�� */
        kind: AtackKind;

        /** ��������̍U�����H */
        friendAtack: boolean;

        /** �U����(0-11) */
        origin: JavaArray<number>;

        /** �����̍U���� */
        ot: JavaArray<number>;

        /** �����̗^�_���[�W */
        ydam: JavaArray<number>;

        /** �U����(0-11) */
        target: JavaArray<number>;

        /** �_���[�W */
        damage: JavaArray<number>;
    }
}