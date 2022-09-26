import { useState } from 'react';

type IndexChange = (newDirection: number) => void | undefined;

const useSlider = (maxIndex: number) => {
    const [index, setIndex] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);
    const [direction, setDirection] = useState(0);

    const handleCheckLeaving = () => setIsLeaving(prev => !prev);

    const increaseIndex: IndexChange = (newDirection) => {
        if (isLeaving) return;
        setDirection(newDirection);
        handleCheckLeaving();
        setIndex(prev => prev === maxIndex ? 0 : prev + 1);
    };

    const decreaseIndex: IndexChange = (newDirection) => {
        if (isLeaving) return;
        setDirection(newDirection);
        handleCheckLeaving();
        setIndex(prev => prev === 0 ? maxIndex : prev - 1);
    };

    return [index, handleCheckLeaving, increaseIndex, decreaseIndex, direction];
}

export default useSlider;