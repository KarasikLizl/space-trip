export const enemySettings = {
    // Началная позиция по одной из оси.
    startPositionOffset: 20,
    // Конечная позиция после которой враг будет пересоздан.
    resetPositionOffset: 100,
    // Скорость передвижения.
    speed: 200,
    // Минимальный урон врага.
    minDamage: 10,
    // Максимальный урон врага.
    maxDamage: 25,
    // Скорость врага после поедания еды.
    boostSpeed: 400,
};

export const enemyGroupSettings = {
    // Кол-во врагов на сцене
    maxEnemiesOnScene: 3,
    // Задержа перед началом создания врагов в начале игры.
    createDelay: 1500,
}
