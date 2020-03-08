class CoreController {
  static spin() {
    const spinResult = this.getSpinResult();
    const splittedArray = this.splitArr(spinResult.matrix, 3);
    const state = this.isWin(splittedArray);
    console.log(
      `You ${state ? "won" : "lose"}!\nYour slots was:\n${splittedArray.join(
        "\n"
      )}`
    );
    this.checkQuests(spinResult, state);
  }

  static getQuests() {
    return [
      {
        id: 1,
        userId: 1,
        questType: "do_spin",
        questValue: 12,
        userQuestValue: 0,
        isCompleted: false,
        dateCompleted: null
      },
      {
        id: 1,
        userId: 1,
        questType: "spent_money",
        questValue: 2000,
        userQuestValue: 0,
        isCompleted: false,
        dateCompleted: null
      },
      {
        id: 1,
        userId: 1,
        questType: "combo_row",
        questValue: 2,
        userQuestValue: 0,
        isCompleted: false,
        dateCompleted: null
      },
      {
        id: 1,
        userId: 1,
        questType: "get_symbol",
        questValue: 1,
        userQuestValue: 0,
        isCompleted: false,
        dateCompleted: null
      }
    ];
  }

  static getSpinResult() {
    return {
      matrix: [1, 3, 7, 2, 3, 5, 6, 3, 4, 7, 2, 71, 9, 9, 4],
      spentMoney: 1000
    };
  }

  static splitArr(arr, chunks) {
    return [...Array(chunks)].map((_, chunk_index) => {
      return arr.filter(
        (__, input_index) => input_index % chunks === chunk_index
      );
    });
  }

  static isWin(splittedArray) {
    let series = [];
    for (let line of splittedArray) {
      let line_row = 1;
      for (let i = 0; i <= line.length - 1; i++) {
        if (line[i] === line[i + 1]) {
          line_row++;
        }
        if (i === line.length - 1) {
          series.push(line_row);
        }
      }
    }
    return Math.max(...series);
  }

  static checkQuests(spinResult, largestRow) {
    const specialNumber = 71;
    let questList = this.getQuests();
    let isSpecial = spinResult.matrix.indexOf(specialNumber) != -1;
    questList = questList
      .filter(quest => {
        if (!quest.isCompleted) return quest;
      })
      .map(quest => {
        switch (quest.questType) {
          case "do_spin":
            quest.userQuestValue++;
            break;
          case "spent_money":
            quest.userQuestValue += spinResult.spentMoney;
            break;
          case "combo_row":
            if (largestRow >= 3) quest.userQuestValue++;
            break;
          case "get_symbol":
            if (isSpecial) quest.userQuestValue++;
            break;
        }

        if (quest.userQuestValue >= quest.questValue) {
          quest.isCompleted = true;
          quest.dateCompleted = Date.now();
          console.log(`You've completed quest:${quest.questType}`);
        }
      });
  }
}

module.exports = CoreController;
