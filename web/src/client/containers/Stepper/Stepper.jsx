import React, { Component } from 'react';
import Button from '@platform-ui/button';
import Stepper from 'react-stepper-horizontal';

const STEPS = [{
    title: 'Тест 1',
    onClick: (e) => {
        e.preventDefault()
        console.log('onClick', 1)
    }
}, {
    title: 'Тест 2',
    onClick: (e) => {
        e.preventDefault()
        console.log('onClick', 2)
    }
}, {
    title: 'Тест 3',
    onClick: (e) => {
        e.preventDefault()
        console.log('onClick', 3)
    }
}];

class StepperCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: STEPS,
            currentStep: 0,
            isPending: props.isPending
        };
    }

    onClickNext = () => {
        this.setState(({ currentStep }) => ({
            currentStep: currentStep + 1
        }));
    }

    render() {
        const { steps, currentStep } = this.state;
        console.log('currentStep', currentStep);

        return (
            <div>
                <Stepper steps={ steps } activeStep={ currentStep } />
                <div style={{textAlign: 'center', marginTop: '5px'}}>
                    <Button
                        s='m'
                        theme='secondary'
                        onClick={this.onClickNext}
                        disabled={this.state.isPending}
                    >
                        Далее
                    </Button>
                </div>
            </div>
        );
    }
};

export default StepperCustom;