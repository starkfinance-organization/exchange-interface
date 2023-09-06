import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from '@ethersproject/bignumber';
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React';
import { getOwnerLiquidityPools, removeLiquidityCallback } from '../../../state/liquidity';
import '../style.scss';
import { Button } from 'antd';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const PairComponent = ({ pool, setReload }) => {
    const { account, library } = useActiveWeb3React();

    const [submitting, setSubmitting] = useState(false);

    const onRemoveLiquidityCallback = useCallback(async () => {
        try {
            if (!pool) return;
            const removeAmount = BigNumber.from(pool.balanceOf.raw.toString());
            setSubmitting(true);
            await removeLiquidityCallback(account, library, pool.pair, removeAmount);
            setSubmitting(false);
            setReload((pre) => !pre);
            alert('Remove liquidity success');
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            alert(error?.reason ?? error?.message ?? error);
        }
    }, [account, library, pool]);

    return (
        <div className="row gap-5 a-center p-20 input-wrapper">
            <div className="body-one a-center row gap-30" style={{ flex: 'auto' }}>
                <div className="row a-center flex-2">
                    <h4>
                        {pool?.pair?.token0?.symbol ?? '~'} / {pool?.pair?.token1?.symbol ?? '~'}
                    </h4>
                </div>

                <div className="col a-center flex-1">
                    <h5 className="body-one-title" style={{ color: '#747272' }}>
                        Liquidity Provided
                    </h5>
                    <h5>{pool?.balanceOf.toSignificant(18)}</h5>
                </div>
                <Button
                    style={{
                        border: 'none',
                        borderRadius: '10px',
                    }}
                    className="hover-primary-color"
                    onClick={onRemoveLiquidityCallback}
                    loading={submitting}
                >
                    Remove
                </Button>
            </div>
        </div>
    );
};

const MyPools = () => {
    const { account, isConnected: isConnectedEvm, library } = useActiveWeb3React();

    // liquidity pools
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [ownerPools, setOwnerPools] = useState([]);

    useEffect(() => {
        let isMounted = true;
        getOwnerLiquidityPools(library, account)
            .then((res) => {
                isMounted && setOwnerPools(res);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
        return () => {
            isMounted = false;
        };
    }, [account, library, reload]);

    return (
        <div>
            <div className="form-show" style={{ marginTop: 10 }}>
                <div className="col gap-10" style={{ gap: 2, marginTop: 0, marginBottom: 0 }}>
                    {isConnectedEvm ? (
                        <div
                            className="row gap-10"
                            style={{ flexDirection: 'column', justifyContent: 'space-between' }}
                        >
                            {ownerPools.length == 0 ? (
                                <h4>Loading...</h4>
                            ) : (
                                ownerPools.map((pool, index) => (
                                    <PairComponent key={index} pool={pool} setReload={setReload} />
                                ))
                            )}
                        </div>
                    ) : (
                        <h5 style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                            Connect wallet to view your pools
                        </h5>
                    )}
                </div>
            </div>
            {/* <div className="table-swap">
                <TableContainer component={Paper} style={{ background: '#0e0a1f' }}>
                    <Table sx={{}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center' }}>Txhash</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Address</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>From</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>To</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    aaa
                                </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>aaa</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>aaa</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>aaa</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>aaa</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> */}
        </div>
    );
};

export default MyPools;
