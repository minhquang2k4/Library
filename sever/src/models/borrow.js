const mongoose = require('mongoose');
const schema = mongoose.Schema;

const borrowSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    bookId: {
        type: schema.Types.ObjectId,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    endReal: {
        type: Date,
        default: null
    }
});

borrowSchema.pre('save', function (next) {
    if (this.endReal === null) {
        this.status = 'Chưa trả';
    } else if (this.endReal <= this.end) {
        this.status = 'Đã trả';
    } else if (this.endReal > this.end) {
        this.status = 'Trả muộn';
    }
    next();
});

borrowSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.endReal !== undefined) {
        const endReal = update.endReal;
        const borrow = await this.model.findOne(this.getQuery());
        const end = borrow.end;

        if (endReal === null) {
            update.status = 'Chưa trả';
        } else if (endReal <= end) {
            update.status = 'Đã trả';
        } else if (endReal > end) {
            update.status = 'Trả muộn';
        }

        this.setUpdate(update);
    }

    next();
});

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = Borrow;