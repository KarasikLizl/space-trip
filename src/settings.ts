import Phaser from 'phaser';

const body = document.querySelector('body');
const bodyRect = body?.getBoundingClientRect();

export const globalSettings: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: bodyRect?.width || 0,
    height: bodyRect?.height || 0,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 },
        }
    },
};

export const uiSettings = {
    font: 'Roboto',
    menu: {
        title: {
            fontSize: 100,
            fontColor: '#fff',
            text: 'Добро пожаловать в \n хомячий бедтрип',
        },
        description: {
            fontSize: 25,
            fontColor: '#fff',
            text: '( нажмите в любое место )',
        }
    },
    end: {
        title: {
            fontSize: 100,
            fontColor: '#fff',
            text: 'Вас отпустило',
        },
        description: {
            fontSize: 25,
            fontColor: '#fff',
            text: '( нажмите в любое место, что бы начать заново )',
        }
    },
    scoreBoard: {
        timeText: 'Время: ',
        healthText: 'Здоровье: ',
        satietyText: 'Сытость: '
    }
}
