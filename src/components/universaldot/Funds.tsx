type Props = {
  balance: string;
  reputation: string;
};

const Funds = ({ balance, reputation }: Props) => (
  <div>
    <div>Reputation Points: {reputation}</div>
    <div>Cryptocurrency: ₿{balance}</div>
  </div>
);

Funds.displayName = 'Funds';

export default Funds;
