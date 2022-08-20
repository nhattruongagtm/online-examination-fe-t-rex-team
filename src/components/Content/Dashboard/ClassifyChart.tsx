import { Pie, measureTextWidth } from '@ant-design/plots';

type Props = {}

interface InputForm {
    password: string
    confirmPwd: string
}

const ClassifyChart = (props: Props) => {
    const data = [
        {
            type: 'Excellent',
            value: 27,
        },
        {
            type: 'Good',
            value: 25,
        },
        {
            type: 'Average',
            value: 15,
        },
        {
            type: 'Below Average',
            value: 15,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 16,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: 'Classify',
            },
        },
    };
    return <Pie {...config} />;
}
export default ClassifyChart
