const styles = require('../styles/Home.module.less');
import { Radio, Typography, Row, Descriptions, Table, Divider } from 'antd';
const { Title } = Typography;
import { useState, useEffect } from 'react';
import axios from 'axios';

const getRace = async (race) => {
	const response = await axios.get(`https://www.atg.se/services/racinginfo/v1/api/games/${race.id}`);
	return {
		id: race.id,
		startTime: race.startTime,
		races: response.data.races,
	};
};

const formatTime = (time = '') => time.replace('T', ' ');

const columns = [
	{
		title: 'Start number',
		dataIndex: 'number',
		defaultSortOrder: 'ascend',
		sorter: (a, b) => a.number - b.number,
	},
	{
		title: 'Horse name',
		key: 'horseName',
		render: (text, record) => record.horse.name,
		sorter: (a, b) => a.horse.name.localeCompare(b.horse.name),
	},
	{
		title: 'Rider name',
		key: 'driver',
		render: (text, record) => `${record.driver.firstName} ${record.driver.lastName}`,
		sorter: (a, b) =>
			`${a.driver.lastName} ${a.driver.firstName}`.localeCompare(`${b.driver.lastName} ${b.driver.firstName}`),
	},
];

const Home = () => {
	const [gameType, setGameType] = useState('V75');
	const [currentGame, setCurrentGame] = useState({ id: 'Loading...', races: [] });

	const onChange = ({ target: { value } }) => {
		setGameType(value);
	};

	useEffect(async () => {
		console.log(`Game type changed to ${gameType}`);
		const { data } = await axios.get(`https://www.atg.se/services/racinginfo/v1/api/products/${gameType}`);
		if (data.upcoming[0]) {
			setCurrentGame(await getRace(data.upcoming[0]));
		} else if (data.results[0]) {
			setCurrentGame(await getRace(data.results[0]));
		} else {
			setCurrentGame({ error: 'No games found.' });
		}
	}, [gameType]);

	return (
		<div>
			<Row>
				<Radio.Group onChange={onChange} defaultValue={gameType} buttonStyle="solid">
					<Radio.Button value="V75">V75</Radio.Button>
					<Radio.Button value="V65">V65</Radio.Button>
					<Radio.Button value="V64">V64</Radio.Button>
					<Radio.Button value="V4">V4</Radio.Button>
				</Radio.Group>
			</Row>
			<Row>
				<Title level={2}>{gameType}</Title>
			</Row>
			<Row>
				<Title level={3}>Races:</Title>
			</Row>
			{currentGame.races.map((race, index) => (
				<div className={styles.raceDescription} key={race.id}>
					<Row>
						<Title level={4}>{race.name || race.track?.name}</Title>
					</Row>
					<Row className={styles.raceDescription}>
						<Descriptions bordered>
							<Descriptions.Item label="Race number">{race.number}</Descriptions.Item>
							<Descriptions.Item label="Start time">{formatTime(race.startTime)}</Descriptions.Item>
						</Descriptions>
					</Row>
					<Row>
						<Table
							bordered
							style={{ width: '100%' }}
							columns={columns}
							dataSource={race.starts}
							pagination={false}
							rowKey="number"
							expandable={{
								expandedRowRender: (record) => (
									<p style={{ margin: 0 }}>
										<b>Trainer: </b>
										{record.horse.trainer.firstName} {record.horse.trainer.lastName}{' '}
										<b>Horse father: </b>
										{record.horse.pedigree.father.name}
									</p>
								),
							}}
						/>
					</Row>
					<Row>
						<Divider />
					</Row>
				</div>
			))}
		</div>
	);
};

export default Home;
