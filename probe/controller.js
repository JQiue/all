const os = require('os');
const si = require('systeminformation')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class OSUtils {
    constructor() {
        this.cpuUsageMSDefault = 1000;
        this.memUsageMSDefault = 1000;
    }
    getCPUInfo() {
        const cpus = os.cpus();
        let user = 0, nice = 0, sys = 0, idle = 0, irq = 0, total = 0;
        for (let cpu in cpus) {
            const times = cpus[cpu].times;
            user += times.user;
            nice += times.nice;
            sys += times.sys;
            idle += times.idle;
            irq += times.irq;
        }
        total += user + nice + sys + idle + irq;
        return { user, sys, idle, total }
    }
    async getCPUUsage(options = {}) {
        let { cpuUsageMS, percentage } = options;
        cpuUsageMS = cpuUsageMS || this.cpuUsageMSDefault;
        const t1 = this.getCPUInfo();
        await sleep(cpuUsageMS)
        const t2 = this.getCPUInfo();
        const idle = t2.idle - t1.idle;
        const total = t2.total - t1.total;
        let usage = 1 - idle / total;
        if (percentage) usage = (usage * 100).toFixed(2) + '%'
        return usage
    }
    async getMemoryUsage(options = {}) {
        let { memUsageMS, percentage } = options;
        memUsageMS = memUsageMS || this.memUsageMSDefault;
        let usage = 1 - os.freemem() / os.totalmem();
        if (percentage) usage = (usage * 100).toFixed(2) + '%'
        return usage;
    }
}

const get = async () => {
    let cpu = 0, mem = 0, uptime = 0, disk = 0, net = 0, rx = 0, tx = 0 , diskIO = 0;
    cpu = await new OSUtils().getCPUUsage();
    mem = await new OSUtils().getMemoryUsage();
    uptime = os.uptime();
    disk = (await si.fsSize())[0].use;
    net = (await si.networkStats())[0];
    rx = net.rx_sec;
    tx = net.tx_sec;
    return { cpu, mem, uptime, disk, rx, tx }
}

module.exports = { get };