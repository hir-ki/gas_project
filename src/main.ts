type TermsAndDescriptionType = {
    term: string;
    description: string;
};

/* ランダムな整数値を取得する */
const getRandomNumber = (max: number): number => {
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*  NotionのDBからTermとそのDescriptionを取得する */
const getNotionData = (): TermsAndDescriptionType => {
    try {
        const NOTION_API_KEY =
            PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY');
        const DATABASE_ID = PropertiesService.getScriptProperties().getProperty(
            'DATABASE_ID',
        ) as string;
        const notionDatabaseURL = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
        const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            method: 'post',
            headers: {
                /* eslint-disable */
                Authorization: `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28',
                /* eslint-enable */
            },
        };
        // DBから全データを取得
        const response = UrlFetchApp.fetch(notionDatabaseURL, options);
        /* eslint-disable */
        const data = JSON.parse(response.getContentText());

        // 取得したデータからTermとDescriptionを取得
        const getTermsAndDescription: TermsAndDescriptionType[] = data.results.map((page: any) => ({
            term: page.properties.Term.title[0].text.content,
            description: page.properties.Description.rich_text[0].plain_text,
            /* eslint-disable */
        }));

        // 単語の数を取得する
        const termsNumbers = getTermsAndDescription.length;

        // ランダムに1つの単語を取得
        const selectedTermNumber = getRandomNumber(termsNumbers);

        return getTermsAndDescription[selectedTermNumber];
    } catch (error) {
        console.log('getNotionData error: ', error);
        throw new Error('getNotionData error');
    }
};

/*  LINE Notify APIを使用して、指定したメッセージをLINEに送信する  */
const notifyLine = (getTermsAndDescription: TermsAndDescriptionType): void => {
    try {
        const LINE_NOTIFY_API_TOKEN =
            PropertiesService.getScriptProperties().getProperty('LINE_NOTIFY_API_TOKEN');
        const notifyUrl = 'https://notify-api.line.me/api/notify';
        const message = `\n今日の単語: ${getTermsAndDescription.term}\n意味: ${getTermsAndDescription.description}`;
        const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            method: 'post',
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Authorization: `Bearer ${LINE_NOTIFY_API_TOKEN}`,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            payload: {
                message: message,
            },
        };
        UrlFetchApp.fetch(notifyUrl, options);
    } catch (error) {
        console.log('notifyLine error: ', error);
        throw new Error('notifyLine error');
    }
};

const main = (): void => {
    let counter = 0;
    let sentTermsAndDescription = {
        term: 'default',
        description: 'default',
    };
    try {
        // 違う単語で２回送信する
        while (counter < 2) {
            let termsAndDescription = getNotionData();
            if (termsAndDescription !== sentTermsAndDescription) {
                notifyLine(termsAndDescription);
                sentTermsAndDescription = termsAndDescription;
                counter++;
            }
        }
    } catch (error) {
        console.log('main error: ', error);
    }
};

main();
